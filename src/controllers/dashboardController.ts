import { Request, Response, NextFunction } from 'express-serve-static-core'
import Attendance from '../entity/Attendance'
import { getRepository, JoinTable } from 'typeorm'
import Student from '../entity/Student'
class DashboadController {
	index = async (req: Request, res: Response, next: NextFunction) => {
		const attendanceRepository = getRepository(Attendance)
		// const data = await attendanceRepository.find({ relations: ['students'] })

		const data = await attendanceRepository
			.createQueryBuilder('student')
			.getMany()
			.catch(e => {
				console.log(e)
				res.send(e)
			})

		res.send(data)
	}
}

export default new DashboadController()
