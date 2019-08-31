import { Request, Response } from 'express'
import Student from '../entity/Student'
import Attendance from '../entity/Attendance'
import { getRepository } from 'typeorm'

class TestController {
	index = async (req: Request, res: Response) => {
		let data: any
		let sr = getRepository(Student)
		let ar = getRepository(Attendance)

		// data = await sr.find({ relations: ['attendances'] })
		data = await ar.find({ relations: ['student'] })

		res.send(data)
	}
}

export default new TestController()
