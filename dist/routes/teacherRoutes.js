"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("./../controllers/teacherController");
const checkRoll_1 = require("./../middlewares/checkRoll");
let router = express_1.Router();
router
    .get('/', teacherController_1.default.getAll)
    .post('/', checkRoll_1.isPrinciple, teacherController_1.default.create)
    .get('/:id', teacherController_1.default.getOneById)
    .patch('/:id', teacherController_1.default.update)
    .delete('/:id', teacherController_1.default.destroy);
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
exports.default = router;
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
//# sourceMappingURL=teacherRoutes.js.map