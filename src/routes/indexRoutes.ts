import { Router, Request, Response } from 'express'
import teacherRoutes from './teacherRoutes'
import studentRoutes from './studentRoutes'

let appRoutes = Router()

////// StudentRoutes
// appRoutes.use('/api/students', studentRoutes)

////// TeacherRoutes
appRoutes.use('/api/teachers', teacherRoutes)

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
