import Router from 'koa-router';


export const router = new Router();

// POST /api/checkin_student/{checkin_id}
router.post(':checkin_id');

// GET /api/checkin_student/{checkin_id}
router.get(':checkin_id');

// api: DELETE /api/checkin_student/{checkin_id}
router.delete(':checkin_id');

