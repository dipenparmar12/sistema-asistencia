import { Request, Response, Router } from 'express'
import TeacherRepository from '../repos/teacherRepository'
import { getRepository } from 'typeorm'
import Teacher from '../entity/Teacher'
let router = Router()

router
	.get('/', async (req: Request, res: Response) => {
		const teacherRepository = getRepository(Teacher)
		res.send(await teacherRepository.find())
	})
	.get('/:id', (req: Request, res: Response) => {
		res.send('Teacher ID: ' + req.params.id)
	})

export default router

// class TeacherRoutes {
// 	public routes(app): void {
// 		app.route('/').get(async (req: Request, res: Response) => {
// 			const tRepo = getRepository(Teacher);
// 			const teachers = await tRepo.find();
// 			// console.log(teachers);
// 			res.send(teachers);
// 		});
// 	}
// }
// export default new TeacherRoutes();
// exports default teacherRouter

// router
//     .get('/', controller.getAll)

//     .post('/', controller.create)
//     .get('/:id', controller.findByid)
//     .patch('/:id', controller.update)
//     .delete('/:id', controller.destroy)
