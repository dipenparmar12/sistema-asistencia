import { Router, Request, Response } from 'express'

let appRoutes = Router()

///// Auth Routes
appRoutes.get('/login', (req: Request, res: Response) => {
	res.render('teacher_login')
})
appRoutes.get('/registration', (req: Request, res: Response) => {
	res.render('teacher_registration')
})

appRoutes.get('/', (req: Request, res: Response) => {
	res.send('HomePage')
})

export default appRoutes
