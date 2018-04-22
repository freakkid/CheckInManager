import Router from 'koa-router';
// import { userCtrl } from '../controllers';

export const router = new Router();

// 老师主页面获取所教课程列表
// 页面 GET /course
router.get('/course');

// 老师选择某个课程信息
// 页面 GET /course/{course_id}
router.get('/course/:course_id');

// 老师选择某个课程的查看签到信息
// 页面 GET /course/{course_id}/checkin_student
router.get('/course/:course_id/checkin_student');

// 点击某一条签到记录查看详细签到结果
// 页面 GET /course/{course_id}/checkin_student/{checkin_id}
router.get('/course/:course_id/checkin_student/:checkin_id');

// 选择某个课程的发起签到
// 页面 GET /course/{course_id}/checkin_course?gpsinfo=xxxx
router.get('/course/:course_id/checkin_course');
