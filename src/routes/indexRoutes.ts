import { Router, Request, Response } from 'express'
import imageUploader from './../controllers/utilController'

let route = Router()

route.get('/registration', (req: Request, res: Response) => {
	res.render('student_registration')
})

route.post('/registration', imageUploader().single('profile_pic'), (req: Request, res: Response) => {
	res.send('FileUploaded')
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
