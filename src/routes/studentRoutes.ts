import { Router, Request, Response } from 'express'
import controller from '../controllers/studentController'
import authController from '../controllers/authController'
import { checkJwt } from '../middlewares/checkJwt'

let router = Router()

router
	.get('/', controller.getAll)

	.post('/', controller.create)
	.get('/:id', controller.getOneById)
	.patch('/:id', controller.update)
	.delete('/:id', controller.destroy)

export default router
