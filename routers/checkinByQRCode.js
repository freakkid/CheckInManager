import Router from 'koa-router';
import { checkinByQRCodeCtrl } from '../controllers';


export const router = new Router();

// 学生扫二维码获取的页面
// GET /checkinByQRCode/{checkin_id} 
router.get('/:checkin_id',checkinByQRCodeCtrl.QRCodeUrlPage);
