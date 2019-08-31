import { Request, Response, NextFunction } from 'express-serve-static-core'
import Attendance from '../entity/Attendance'
import { getRepository, JoinTable } from 'typeorm'
import Student from '../entity/Student'

class DashboadController {
	dashboard = async (req: Request, res: Response, next: NextFunction) => {
		let data: any
		let attendanceRepository = getRepository(Attendance)

		data = await attendanceRepository.find({ relations: ['student'] })
		res.render('dashboard', { data })
	}

	getAttendaceWithStudent = async (req: Request, res: Response, next: NextFunction) => {
		let attendanceRepository = getRepository(Attendance)
		let data = await attendanceRepository.find({ relations: ['student'] })
		res.send(data)
		// console.log(students)
		// res.send(students)
	}
}

export default new DashboadController()
