import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Teacher from './../entity/Teacher';

export class TeacherRoutes {
	public routes(app): void {
		app.route('/').get(async (req: Request, res: Response) => {
			const tRepo = getRepository(Teacher);
			const teachers = await tRepo.find();
			// console.log(teachers);
			res.send(teachers);
		});
	}
}
