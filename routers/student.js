import Router from 'koa-router';
import { studentCtrl } from '../controllers';


export const router = new Router();

// 管理员添加全级学生的页面
// 页面 GET /student
router.get('/', studentCtrl.studentListPage);

