import 'reflect-metadata'
import * as path from 'path'

import * as dotenv from 'dotenv'
import * as helmet from 'helmet'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { createConnection, Connection, getRepository, Column, getConnection } from 'typeorm'
import Student from './entity/Student'
import Attendance from './entity/Attendance'
import Teacher from './entity/Teacher'

import appRoutes from './routes/indexRoutes'
import teacherRoutes from './routes/teacherRoutes'
import studentRoutes from './routes/studentRoutes'
import attendanceRoutes from './routes/attendanceRoutes'

import * as utilController from './controllers/utilController'
import teacherController from './controllers/teacherController'
import authController from './controllers/authController'
import { checkJwt, isLogged } from './middlewares/checkJwt'

dotenv.config()

class MyApplication {
	public _express: express.Application = express()
	public port: number = parseInt(process.env.PORT)
	db: Connection

	constructor() {
		this.appMiddlewares()
		this.devRoutes()
		this.appRoutes()
		this.conn()
		this._express.listen(this.port, () => {
			console.log(process.env.APP_NAME + ', Started At:' + this.port)
		})
		this.insertFakeData()
	}

	public async insertFakeData() {
		console.log(' insertFakeData() Method')

		let teachers: any = await utilController.getCsvData('./src/fixtures/teachers.csv').then(data => data)
		let students: any = await utilController.getCsvData('./src/fixtures/students.csv').then(data => data)
		// console.log(teachers[1])

		const con = getConnection()
		let teacherRepository = getRepository(Teacher)
		let studentRepository = getRepository(Student)

		teachers.forEach( async teacher => {
			let t = await teacherRepository.save(teacher).catch(e => {
				console.log(e)
			})

			students.forEach(async stud => {
				stud.name = null
				stud.enrollment_no = null 
				stud.teacherid = null 

				stud.name = 'A ' + Math.floor(Math.random() * (10000000 - 1) + 1)
				stud.enrollment_no = Math.floor(Math.random() * (10000000 - 1) + 1)
				stud.teacherid = t.id
				
				console.log(stud)
				let s = await studentRepository.save(stud).catch(e => {
					console.log(e)
				})
			})
		})

		// teachers.forEach(teacher => {
		// console.log('User:' + teacher.username + ' inserted.')
		// students.forEach(stud => {
		// 	stud.teacher_id = teacher.id
		// 	stud.name = stud.name +' '+ teacher.username
		// 	studentRepository.create(stud)
		// })
		// })

		// console.log(await teacherRepository.find())
		// let test = await con.manager.find(Teacher)
		// console.log(test)

		// createConnection(/*...*/)
		// 	.then(async connection => {
		// let teacherRepository = getRepository(Teacher)
		// let studentRepository = getRepository(Student)
		// teachers.forEach(teacher => {
		// 	teacherRepository.save(teacher)
		// 	// students.forEach(stud => {
		// 	// 	studentRepository.save(stud.username + teacher.username)
		// 	// })
		// 	console.log('User:' + teacher.username + ' inserted.')
		// })
		// 	})
		// 	.catch(error => console.log(error))
	}

	/**
	 * Express Midallwares & other configration ( Cookies, static path ..etc )
	 */
	private appMiddlewares(): void {
		this._express.use(helmet())
		this._express.use(bodyParser.json())
		this._express.use(bodyParser.urlencoded({ extended: false }))
		this._express.use(cookieParser())
		this._express.use('/', express.static(path.join(__dirname, '../public')))
		this._express.set('views', path.join(__dirname, 'views'))
		this._express.set('view engine', 'pug')
	}

	/**
	 * Set All Application Routes from External Class's
	 */
	private appRoutes(): void {
		this._express.post('/login', authController.loginAuth)
		this._express.get('/logout', authController.logout)
		this._express.get('/login', isLogged, authController.loginView)
		this._express.use('/api/teachers', checkJwt, teacherRoutes)
		this._express.use('/api/students', checkJwt, studentRoutes)
		this._express.use(checkJwt, attendanceRoutes)
		this._express.use(checkJwt, appRoutes)
		this.errorRoutes()
	}

	/**
	 * ERROR AND Undefined Routes
	 */
	private errorRoutes() {
		////.... IF Request Route not Found.. THRO ERROR
		this._express.use((req, res, next) => {
			res.status(404).render('errors/404.pug', { url: req.url })
		})
		this._express.use((err, req, res, next) => {
			res.status(500).send(err.stack)
		})
	}

	/**
	 * Database Connection and Configration
	 */
	public async conn() {
		this.db = await createConnection({
			type: 'mysql',
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [Teacher, Student, Attendance],
			synchronize: true,
		})

		// const tRepo = getRepository(Teacher);
		// const teachers = await tRepo.find();
		// console.log(teachers);
	}

	/**
	 * Only Dev Routes for Testing and Creating Record without Login etc
	 */
	public async devRoutes() {
		if (process.env.NODE_ENV === 'dev') {
			this._express.post('/api/teachers', teacherController.create)
		}
		// await getRepository('teacher').save([...itemList], { chunk: 500 })
	}
}

let app = new MyApplication()
export default app
