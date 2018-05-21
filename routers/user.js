import Router from 'koa-router';
import { userCtrl, courseCtrl } from '../controllers';
import { sendPage, sendData } from '../utils';
import { courseModel } from '../models';
import { blockUnsignedVisitors } from '../services'

export const router = new Router();

// 登录页面
// 页面 GET /user/login
router.get('/login', userCtrl.getLoginPage);

router.use(blockUnsignedVisitors);

// 获取修改密码页面
// GET /user/change_password
router.get('/change_password', userCtrl.changePasswordPage);

// 管理员权限 --------------

// 管理员登录页面 教师列表
// GET /user
router.get('/', userCtrl.getAllTeachersListPage);

// 管理员手动添加教师的页面
router.get('/add_user', userCtrl.addTeacherPage);

// 选择某个教师进入课程列表
// 页面 GET /user/{user_id}/course
router.get('/:user_id/course', userCtrl.getAllCoursesByTeacherIDPage);

// 管理员添加课程的页面
// 页面 GET /user/{user_id}/add_course
router.get('/:user_id/add_course', userCtrl.addCoursePage);

// 管理员选择某个教师进入课程列表再选择课程进入该课程的学生列表
// 页面 GET /user/{user_id}/course/{course_id}/course_member
router.get('/:user_id/course/:course_id/course_member', userCtrl.courseMemberPage);

// 管理员手动添加课程学生的页面
// 页面 GET /user/{user_id}/course/{course_id}/add_course_member
router.get('/:user_id/course/:course_id/add_course_member', userCtrl.addCourseMemberPage);
