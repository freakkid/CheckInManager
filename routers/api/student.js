import Router from 'koa-router';
import { apiStudentCtrl } from '../../controllers';


export const router = new Router();

// DELETE /api/student/{student_id}
router.delete('/api/student/{student_id}', apiStudentCtrl.deleteStudent);
