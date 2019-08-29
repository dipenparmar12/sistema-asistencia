import { Router, Request, Response } from 'express'
import attendanceController from '../controllers/attendanceController'

let route = Router()
route.get('/test', attendanceController.test)
route.post('/attendance', attendanceController.get_submit_Attendance)
route.get('/attendance', attendanceController.attendaceView)

export default route
