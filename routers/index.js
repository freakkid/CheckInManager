import Router from 'koa-router';

import { router as userRouter } from './user';
import { router as courseRouter } from './course';
import { router as studentRouter } from './student';
import { router as addStudentRouter } from './add_student';
import { router as checkinByQRCodeRouter } from './checkinByQRCode';
import { router as apiRouter } from './api';

import { toMid, sendData } from '../utils';
import { is_login } from '../services/user/is_login';
import { blockUnsignedVisitors } from '../services';

export const router = new Router();

router.use('/checkinByQRCode', checkinByQRCodeRouter.routes(), checkinByQRCodeRouter.allowedMethods());

router.use(is_login);

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

//router.use(blockUnsignedVisitors);

// 页面显示的api
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/course', courseRouter.routes(), courseRouter.allowedMethods());
router.use('/student', studentRouter.routes(), studentRouter.allowedMethods());
router.use('/add_student', addStudentRouter.routes(), addStudentRouter.allowedMethods());
