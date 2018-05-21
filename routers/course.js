import Router from 'koa-router';
import { courseCtrl } from '../controllers';
import { blockUnsignedVisitors } from '../services';

export const router = new Router();

router.use(blockUnsignedVisitors);

// 老师主页面获取所教课程列表
// 页面 GET /course
router.get('/', courseCtrl.courseListPage);

// 老师选择某个课程信息
// 页面 GET /course/{course_id}
router.get('/:course_id', courseCtrl.coursePage);

// 选择某个课程的学生列表
// 页面 GET /course/{course_id}/course_member
router.get('/:course_id/course_member', courseCtrl.courseMemberPage);

// 老师选择某个课程的查看签到信息
// 页面 GET /course/{course_id}/checkin_student
router.get('/:course_id/checkin_student', courseCtrl.checkinHistoryPage);

// 点击某一条签到记录查看详细签到结果
// 页面 GET /course/{course_id}/checkin_student/{checkin_id}
router.get('/:course_id/checkin_student/:checkin_id', courseCtrl.checkinInfoPage);

// 选择某个课程的发起签到
// 页面 GET /course/{course_id}/checkin_course?gpsinfo=xxxx
router.get('/:course_id/checkin_course', courseCtrl.launchCheckinPage);
