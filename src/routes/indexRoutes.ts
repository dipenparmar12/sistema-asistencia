import { Router, Request, Response } from 'express';
import teacherRouter from './teacherRoutes';

let appRoutes = Router();

appRoutes.get('/', (req: Request, res: Response) => {
	res.send('index');
});

appRoutes.use('/api/teachers', teacherRouter);

export default appRoutes;
