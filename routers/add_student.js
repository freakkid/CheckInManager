import Router from 'koa-router';
import { addStudentCtrl } from '../controllers';
export const router = new Router();


// 管理员手动添加全级学生的页面
// 页面 GET /add_student
router.get('/', addStudentCtrl.addStudentPage);

