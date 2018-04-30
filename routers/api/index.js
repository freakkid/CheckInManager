import Router from 'koa-router';

import { router as userRouter } from './user';
import { router as usersRouter } from './users';
import { router as courseRouter } from './course';
import { router as studentRouter } from './student';
import { router as studentsRouter } from './students';
import { router as checkinStudentRouter } from './checkin_student';

export const router = new Router();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());

router.use('/course', courseRouter.routes(), courseRouter.allowedMethods());

router.use('/student', studentRouter.routes(), studentRouter.allowedMethods());
router.use('/students', studentsRouter.routes(), studentsRouter.allowedMethods());

router.use('/checkin_student', checkinStudentRouter.routes(), checkinStudentRouter.allowedMethods());