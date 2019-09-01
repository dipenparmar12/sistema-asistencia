import { Request, Response } from 'express'
import { CrudController } from './crudController'
import Student from '../entity/Student'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import Teacher from '../entity/Teacher'

class StudentController extends CrudController {
	public _temp: string = 'name'
	constructor() {
		super()
	}

	getAll = async (req: Request, res: Response) => {
		//Get data from database
		const databaseRepository = getRepository(Student)
		const data = await databaseRepository.find({ relations: ['teacher'] })

		//Send the data object
		res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data })
	}

	getOneById = async (req: Request, res: Response) => {
		//Get the ID from the url
		const uuid: string = req.params.id

		//Get the data from database
		const databaseRepository = getRepository(Student)

		try {
			const data = await databaseRepository.findOneOrFail(uuid)
			res.status(200).json({ status: 'success', message: 'data found (findById)', error: false, data: data })
		} catch (error) {
			res.status(404).send(error)
		}
	}

	create = async (req: Request, res: Response) => {
		//Get parameters from the body
		let { roll_no, enrollment_no, name, subject, email, mobile, address, teacherId } = req.body

		let data = new Student()
		data.roll_no = roll_no
		data.enrollment_no = enrollment_no
		data.name = name
		data.subject = subject
		data.email = email
		data.subject = subject
		data.mobile = mobile
		data.address = address
		// data.teacher = teacherId

		/// filename that stored with same_name
		if (req.files.length > 0) {
			data.profile_pic = req.cookies.jwt + '_' + req.files[0].originalname.split('.')[0] + '.jpg'
		}

		// /// Validade if the parameters are ok
		const errors = await validate(data)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return
		}

		//Try to save. If fails, the teachername is already in use
		const databaseRepository = getRepository(Student)
		const teacherRepository = getRepository(Teacher)
		try {
			////// for FK, entry will be stored with FK with Logged Teacher
			const loggedTeacher = await teacherRepository.findOne({ where: { id: res.locals.id } })
			console.log(loggedTeacher)

			//// Relation Maping Table FK with Logged Teacher (ORM)
			data.teacher = loggedTeacher

			await databaseRepository.save(data)
		} catch (e) {
			res.status(401).render('student_registration', { errors: e })
			// res.status(401).json({ status: 'fail', message: e.message, error: e, data: false })
			return
		}

		//If all ok, send 201 response
		res.status(201).redirect('/attendance')
		// res
		// 	.status(201)
		// 	.render('/student_registration', { status: 'success', message: 'Student c', error: false, data: null })
	}

	update = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id
		let data = new Student()

		//Try to find data on database
		const databaseRepository = getRepository(Student)
		try {
			data = await databaseRepository.findOneOrFail(id)
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send('Student not found')
			return
		}

		//Validate the new values on model
		let { username, password, name, email, subject, roll } = req.body

		// data.username = username
		// data.password = password
		// data.name = name
		// data.email = email
		// data.subject = subject
		// data.roll = roll

		const errors = await validate(data)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return
		}

		//Try to safe, if fails, that means teachername already in use
		try {
			await databaseRepository.save(data)
		} catch (e) {
			res.status(409).send('teachername already in use')
			return
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send()
	}

	destroy = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id

		const databaseRepository = getRepository(Student)
		let data: Student
		try {
			data = await databaseRepository.findOneOrFail(id)
		} catch (error) {
			res.status(404).json({ status: 'fail', message: 'Data  not found', data: false,error})
			return
		}

		/// Detele Entry From Table (Hard_Delete)
		databaseRepository.delete(id)

		//After all send a 204 (no content, but accepted) response
		res.status(201).json({ status: 'success', message: 'Data Deleted Succesfuly', data: false })
	}

	///////////////////////
	///////////////
	////////

	getByTeacher = async (req: Request, res: Response) => {
		//Get data from database
		const databaseRepository = getRepository(Student)
		const data = await databaseRepository.find({ teacher: res.locals.id })

		//Send the data object
		res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data })
	}
}

export default new StudentController()
