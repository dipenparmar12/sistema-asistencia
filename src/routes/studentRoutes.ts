import { Router, Request, Response } from 'express'
import studentcontroller from '../controllers/studentController'
import * as util from './../controllers/utilController'

let router = Router()

router
	.get('/', studentcontroller.getAll)

	.post('/', util.upload, studentcontroller.create)
	.get('/:id', studentcontroller.getOneById)
	.patch('/:id', studentcontroller.update)
	.delete('/:id', studentcontroller.destroy)

export default router
