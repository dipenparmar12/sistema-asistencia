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
}

export default new DashboadController()
