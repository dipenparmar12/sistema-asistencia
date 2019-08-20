import { EntityRepository, Repository, getRepository } from 'typeorm';
import Teacher from './../entity/Teacher';

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
	async getTeachers(): Promise<Teacher[]> {
		let Teachers = await this.find();
		return Teachers;
	}
}
