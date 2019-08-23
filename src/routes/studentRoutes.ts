import { Router, Request, Response } from 'express'
import studentcontroller from '../controllers/studentController'

let router = Router()

router
	.get('/', studentcontroller.getAll)

	.post('/', studentcontroller.create)
	.get('/:id', studentcontroller.getOneById)
	.patch('/:id', studentcontroller.update)
	.delete('/:id', studentcontroller.destroy)

export default router
