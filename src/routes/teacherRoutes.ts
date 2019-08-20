import { Request, Response, Router } from 'express';
let router = Router();

router
	.get('/', (req: Request, res: Response) => {
		res.send('Teacher Router');
	})
	.get('/:id', (req: Request, res: Response) => {
		res.send('Teacher ID: ' + req.params.id);
	});

export default router;

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
