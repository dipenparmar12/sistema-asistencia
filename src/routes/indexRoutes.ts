import { Router, Request, Response } from 'express'
import teacherRouter from './teacherRoutes'

let appRoutes = Router()

////// TeacherRoutes
appRoutes.use('/api/teachers', teacherRouter)

appRoutes.get('/', (req: Request, res: Response) => {
	res.send('HomePage')
})

appRoutes.get('/login', (req: Request, res: Response) => {
	res.render('teacher_login')
})

export default appRoutes
