import { Router, Request, Response } from 'express'
import dashboardController from './../controllers/dashboardController'
let route = Router()

route.get('/dashboard', dashboardController.dashboard)

export default route
