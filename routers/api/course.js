import Router from 'koa-router';


export const router = new Router();


// POST /api/course
router.post('/');

// DELETE /api/course/{course_id}
router.post('/:course_id');

// POST /api/course/{course_id}/course_member
router.post('/:course_id/course_member');

// DELETE /api/course/{course_id}/course_member/{student_id}
router.delete('/:course_id/course_member/:student_id');
