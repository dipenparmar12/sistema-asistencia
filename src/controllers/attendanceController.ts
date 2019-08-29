import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import Student from '../entity/Student'
import * as utilController from './utilController'

class AttendanceController {
	attendaceView = async (req: Request, res: Response, next: NextFunction) => {
		const students = await this.getStudentJson(req, res)
		// console.log(students)
		res.render('attendance', { students })
	}

	getStudentJson = async (req: Request, res: Response, next?: NextFunction) => {
		const studentRepository = getRepository(Student)
		const students = await studentRepository.find({
			where: { teacher: res.locals.id },
		})
		return students
	}

	test = async (req: Request, res: Response, next?: NextFunction) => {
		res.send('test Attedance')
		// res.send(students)
	}
}

export default new AttendanceController()
