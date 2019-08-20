import { Router } from 'express';
import teacherRouter from './teacherRoutes';

let appRoutes = Router();

appRoutes.use('/api/teachers', teacherRouter);

export default appRoutes;
