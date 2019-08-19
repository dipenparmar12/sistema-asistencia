import { Request, Response, NextFunction } from 'express';

export class TeacherRoutes {
	public routes(app): void {
		app.route('/').get((req: Request, res: Response) => {
			res.send('Hello From Teacher Route');
		});
	}
}
