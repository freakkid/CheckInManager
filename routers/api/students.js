import Router from 'koa-router';
import { apiStudentsCtrl } from '../../controllers';


export const router = new Router();

// DELETE /api/students
router.delete('/', apiStudentsCtrl.deleteAllStudents);
