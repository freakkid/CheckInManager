import Router from 'koa-router';

import { router as userRouter } from './user';
import { router as usersRouter } from './users';
import { router as courseRouter } from './course';
import { router as studentRouter } from './student';
import { router as studentsRouter } from './students';
import { router as checkinStudentRouter } from './checkin_student';

import { sendData } from '../../utils';

export const router = new Router();

// ?待修改
router.use(function(ctx, next) {
  if (ctx.user_id) {
    next();
  } else {
    sendData(ctx, 401, JSON.stringify({message:'{请先登录}'}));
  }
});

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());

router.use('/course', courseRouter.routes(), courseRouter.allowedMethods());

router.use('/student', studentRouter.routes(), studentRouter.allowedMethods());
router.use('/students', studentsRouter.routes(), studentsRouter.allowedMethods());

router.use('/checkin_student', checkinStudentRouter.routes(), checkinStudentRouter.allowedMethods());
