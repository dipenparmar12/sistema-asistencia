import { Router, Request, Response } from 'express'
import { isPrinciple } from './../middlewares/checkRoll'

let route = Router()

route.get('/test', async (req: Request, res: Response) => {
	res.send('test. INdex ROuts')
})

route.get('/', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/teacher_registration', isPrinciple, (req: Request, res: Response) => {
	res.render('teacher_registration')
})

route.get('/registration', (req: Request, res: Response) => {
	res.render('student_registration', { teacherId: res.locals.id })
})

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

export default route
