import { Request, Response } from 'express'
import { CrudController } from './crudController'
import Attendance from '../entity/Attendance'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

class AttendanceController extends CrudController {
	public _temp: string = 'name'
	constructor() {
		super()
	}
}

export default new AttendanceController()
