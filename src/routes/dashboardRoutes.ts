import { Router, Request, Response } from 'express'
import dashboardController from './../controllers/dashboardController'
let route = Router()

route.get('/dashboard', dashboardController.dashboard)
route.get('/getDashboardData', dashboardController.getAttendaceWithStudent)
export default route
