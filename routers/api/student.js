import Router from 'koa-router';
import { apiStudentCtrl } from '../../controllers';


export const router = new Router();

// DELETE /api/student/{student_id}
router.delete('/:student_id', apiStudentCtrl.deleteStudent);

// POST /api/student
router.post('/', apiStudentCtrl.addStudent);

