import Router from 'koa-router';
// import { userCtrl } from '../controllers';

export const router = new Router();

// PATCH  api/user/password
router.patch('api/user/password');

// POST /api/user
router.post('/api/user');

// DELETE /api/user/{user_id}
router.delete('/api/user/{user_id}');
