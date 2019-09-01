import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import Student from '../entity/Student'
import Attendance from '../entity/Attendance'

class AttendanceController {
	attendaceView = async (req: Request, res: Response, next: NextFunction) => {
		const students = await this.getStudentJson(req, res)
		res.render('attendance', { students })
		// console.log(students)
		// res.send(students)
	}

	getStudentJson = async (req: Request, res: Response, next?: NextFunction) => {
		const studentRepository = getRepository(Student)
		const students = await studentRepository.find({
			where: { teacher: res.locals.id },
		})
		return students
	}

	get_submit_attendance = async (req: Request, res: Response, next?: NextFunction) => {
		let studentRepository = getRepository(Student)
		let attendanceRepository = getRepository(Attendance)

		let submited_data = Object.getOwnPropertyNames(req.body)
		let attendanceEntities = submited_data.map(async (v, i) => {
			let sid: string
			let isPresent: number
			if (v.startsWith('student_id=')) {
				sid = v.slice('student_id='.length)
				isPresent = req.body[v]

				let attendanceEntity = new Attendance()
				attendanceEntity.student_id = sid
				attendanceEntity.present = isPresent
				attendanceEntity.teacher_id = res.locals.id
				attendanceEntity.date = req.body['date']
				attendanceEntity.student = await studentRepository.findOne(sid)

				if (attendanceEntity instanceof Attendance && attendanceEntity != undefined) {
					// console.log(attendanceEntity)
					await attendanceRepository.save(attendanceEntity).then(data => data)
					return attendanceEntity
				}
			}
		})

		res.locals.success = 'Attendance Successfuly Submited.... Thank you for using our service'
		this.attendaceView(req, res, next)
	}

	face = async (req: Request, res: Response, next?: NextFunction) => {
		const students = await this.getStudentJson(req, res)
		res.render('face',{ students })
	}

	test = async (req: Request, res: Response, next?: NextFunction) => {
		res.send('test Attedance')
	}
	
}

export default new AttendanceController()
