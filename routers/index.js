import Router from 'koa-router';

import { router as userRouter } from './user';
import { router as courseRouter } from './course';
import { router as studentRouter } from './student';
import { router as courseMemberRouter } from './course_member';
import { router as checkinCourseRouter } from './checkin_course';
import { router as checkinStudentRouter } from './checkin_student';
import { router as apiRouter } from './api';

export const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/course', courseRouter.routes(), courseRouter.allowedMethods());
router.use('/student', studentRouter.routes(), studentRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

// export {
//   userRouter, courseRouter, studentRouter,
//   courseMemberRouter, checkinCourseRouter,
//   checkinStudentRouter, apiRouter
// };
