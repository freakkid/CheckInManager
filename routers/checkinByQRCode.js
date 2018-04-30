import Router from 'koa-router';
// import { userCtrl } from '../controllers';

export const router = new Router();

// 学生扫二维码获取的页面
// GET /checkinByQRCode/{checkin_id} 
router.get('/checkinByQRCode/:checkin_id');
