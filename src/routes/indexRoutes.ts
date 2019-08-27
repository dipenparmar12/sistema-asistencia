import { Router, Request, Response } from 'express'
import { checkRoll } from './../middlewares/checkRoll'
let route = Router()

route.get('/teacher_registration', checkRoll, (req: Request, res: Response) => {
	res.render('teacher_registration')
})

route.get('/registration', (req: Request, res: Response) => {
	res.render('student_registration')
})

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/attendance', (req: Request, res: Response) => {
	res.render('attendance')
})

route.get('/dashboard', (req: Request, res: Response) => {
	res.render('dashboard')
})

export default route
