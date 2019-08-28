import { Router, Request, Response } from 'express'
import { isPrinciple } from './../middlewares/checkRoll'
let route = Router()

route.get('/', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/teacher_registration', isPrinciple, (req: Request, res: Response) => {
	res.render('teacher_registration')
})

route.get('/registration', (req: Request, res: Response) => {
	res.render('student_registration')
})

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/dashboard', (req: Request, res: Response) => {
	res.render('dashboard')
})

export default route
