import { Router, Request, Response } from 'express'

let appRoutes = Router()

appRoutes.get('/registration', (req: Request, res: Response) => {
	res.render('teacher_registration')
})

appRoutes.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

export default appRoutes
