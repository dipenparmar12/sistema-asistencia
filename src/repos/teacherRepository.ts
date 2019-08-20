import { EntityRepository, Repository, getRepository } from 'typeorm';
import Teacher from '../entity/Teacher';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> {
	async getTeachers(): Promise<Teacher[]> {
		let Teachers = await this.find();
		return Teachers;
	}
}
