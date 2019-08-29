import { Router, Request, Response } from 'express'
import attendanceController from '../controllers/attendanceController'

let route = Router()
route.get('/test', attendanceController.test)
route.get('/attendance', attendanceController.attendaceView)

export default route
