import { Router, Request, Response } from 'express'
let route = Router()

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
