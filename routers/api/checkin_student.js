import Router from 'koa-router';
import { apiCheckinStudentCtrl } from '../../controllers';
import { blockUnsignedVisitors } from '../../services';


export const router = new Router();



// 学生输入：姓名+学号进行签到
// POST /api/checkin_student/{checkin_id}
router.post('/:checkin_id', apiCheckinStudentCtrl.studentCheckin);

router.use(blockUnsignedVisitors);

// 老师实时查看当前签到人数
// GET /api/checkin_student/{checkin_id}
router.get('/:checkin_id', apiCheckinStudentCtrl.getCheckinNum);

// 老师点击结束签到
// api: DELETE /api/checkin_student/{checkin_id}
router.delete('/:checkin_id', apiCheckinStudentCtrl.stopCheckin);

