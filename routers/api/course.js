import Router from 'koa-router';
import { apiCourseCtrl } from '../../controllers';


export const router = new Router();

// 管理员手动导入课程
// POST /api/course
router.post('/', apiCourseCtrl.createCourse);

// 管理员删除某个课程数据
// DELETE /api/course/{course_id}
router.delete('/:course_id', apiCourseCtrl.deleteCourse);

// 添加某个课程中的某个学生数据
// POST /api/course/{course_id}/course_member
router.post('/:course_id/course_member', apiCourseCtrl.addCourseMember);

// 删除某个课程中的某个学生数据
// DELETE /api/course/{course_id}/course_member/{student_id}
router.delete('/:course_id/course_member/:student_id', apiCourseCtrl.deleteCourseMember);
