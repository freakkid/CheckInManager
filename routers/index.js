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
const logout_router = new Router();
logout_router.get('/', async (ctx, next) => {
     //console.log('get / ');
     ctx.response.status = 201;
     //console.log(ctx.response.status);
     ctx.response.type = 'html';
     ctx.response.body = require('fs').createReadStream('./views/html/initial.html');
 });

router.use('/', logout_router.routes());
router.use('/checkinByQRCode', checkinByQRCodeRouter.routes(), checkinByQRCodeRouter.allowedMethods());

router.use(is_login);

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

//router.use(blockUnsignedVisitors);

// 页面显示的api
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/course', courseRouter.routes(), courseRouter.allowedMethods());
router.use('/student', studentRouter.routes(), studentRouter.allowedMethods());
router.use('/add_student', addStudentRouter.routes(), addStudentRouter.allowedMethods());
