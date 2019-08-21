import { Router } from 'express'
import controller from './../controllers/teacherController'
import authController from './../controllers/authController'
import { checkJwt } from '../middlewares/checkJwt'

let router = Router()

router
	.get('/', controller.getAll)

	.post('/', controller.create)
	.get('/:id', controller.getOneById)
	.patch('/:id', controller.update)
	.delete('/:id', controller.destroy)

router.post('/login', authController.login)

// router.post('/login', async (req: Request, res: Response) => {
// 	res.send(req.body)
// })

// router.get('/', async (req: Request, res: Response) => {
// 	res.send(await CrudController.get(Teacher))
// })

// router
// 	.get('/', async (req: Request, res: Response) => {
// 		const teacherRepository = getRepository(Teacher)
// 		res.send(await teacherRepository.find())
// 	})
// 	.get('/:id', (req: Request, res: Response) => {
// 		res.send('Teacher ID: ' + req.params.id)
// 	})

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
