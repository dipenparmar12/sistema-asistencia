import {
	getRepository,
	getConnection
} from 'typeorm';
import Student from './entity/Student';
import Teacher from './entity/Teacher';
import * as utilController from './controllers/utilController';


class FakeData {

	public async insertFakeData(
		isStudentInsert: boolean = true,
		studentCount: number = 3
	) {
		console.log('insertFakeData() Method');

		let teachers: any = await utilController
			.getCsvData('teachers.csv')
			.then(data => data);
		let students: any = await utilController
			.getCsvData('students.csv')
			.then(data => data);
		// console.log(teachers[1])

		const con = getConnection();
		let teacherRepository = getRepository(Teacher);
		let studentRepository = getRepository(Student);

		teachers.forEach(async teacher => {
			let t = await teacherRepository.save(teacher).catch(e => {
				console.log(e);
			});

			if (isStudentInsert) {
				let counter: number = 0;
				students.forEach(async stud => {
					counter += 1;
					if (counter < studentCount) {
						stud.name = null;
						stud.enrollment_no = null;
						stud.teacherid = null;

						stud.name = 'A-' + Math.floor(Math.random() * (10000000 - 1) + 1);
						stud.enrollment_no = Math.floor(Math.random() * (10000000 - 1) + 1);
						stud.teacher = t;

						// console.log(stud);
						let s = await studentRepository.save(stud).catch(e => {
							console.log(e);
						});
					}
				});
			}
		});

		// console.log(await teacherRepository.find())
		// let myTeacher = await con.manager.find(Teacher)
		// console.log(myTeacher)
	}
}