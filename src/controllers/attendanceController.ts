import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import Student from '../entity/Student'
import * as utilController from './utilController'
import Attendance from '../entity/Attendance'
import { ArrayIterator } from 'lodash'

class AttendanceController {
	attendaceView = async (req: Request, res: Response, next: NextFunction) => {
		const students = await this.getStudentJson(req, res)
		res.render('attendance', { students })
		// console.log(students)
		// res.send(students)
	}

	getStudentJson = async (req: Request, res: Response, next?: NextFunction) => {
		const studentRepository = getRepository(Student)
		const students = await studentRepository.find({
			where: { teacher: res.locals.id },
		})
		return students
	}

	get_submit_attendance = async (req: Request, res: Response, next?: NextFunction) => {
		let submited_data = Object.getOwnPropertyNames(req.body)

		let attendanceEntities = submited_data.map((v, i) => {
			let sid: string
			let isPresent: number
			if (v.startsWith('student_id=')) {
				sid = v.slice('student_id='.length)
				isPresent = req.body[v]

				// console.log(sid, isPresent, date, res.locals.id)

				let attendanceEntity = new Attendance()
				attendanceEntity.student_id = sid
				attendanceEntity.present = isPresent
				attendanceEntity.teacher_id = res.locals.id
				attendanceEntity.date = req.body['date']

				if (attendanceEntity instanceof Attendance) return attendanceEntity
				// return {
				// 	student_id: sid,
				// 	present: isPresent,
				// 	teacher_id: res.locals.id,
				// 	date,
				// }
			}
		})

		// console.log(attendanceEntities)
		const attendanceRepository = getRepository(Attendance)
		attendanceEntities.forEach(async attendanceEntity => {
			if (attendanceEntity instanceof Attendance) {
				await attendanceRepository.save(attendanceEntity)
			}
		})

		res.redirect('attendance')
		// res.render('attendance', { message: 'Attendance Successfuly Submit.... Thank you for using our service' })
	}

	test = async (req: Request, res: Response, next?: NextFunction) => {
		res.send('test Attedance')
	}
}

export default new AttendanceController()
