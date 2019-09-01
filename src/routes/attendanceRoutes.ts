import { Router, Request, Response } from 'express'
import attendanceController from '../controllers/attendanceController'

let route = Router()
route.get('/attendance', attendanceController.attendaceView)
route.get('/face', attendanceController.face)
route.post('/attendance', attendanceController.get_submit_attendance)

export default route
