import { Request, Response } from 'express'
import { CrudController } from './crudController'
import Teacher from '../entity/Teacher'

class TeacherController extends CrudController {
	constructor() {
		super('Teacher | Crud')
	}

	async test(req: Request, res: Response) {
		await res.send('TEACHER')
	}
}

export default new TeacherController()
