import { Router, Request, Response } from 'express'

let route = Router()

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/registration', (req: Request, res: Response) => {
	res.render('teacher_registration')
})

route.get('/attendance', (req: Request, res: Response) => {
	res.render('attendance')
})

export default route
