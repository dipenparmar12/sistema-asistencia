import { Router } from 'express'
import testController from './../controllers/testController'
let route = Router()

route.get('/test', testController.index)
export default route
