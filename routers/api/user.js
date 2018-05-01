import Router from 'koa-router';
import { apiUserCtrl } from '../../controllers';

export const router = new Router();

// PATCH  api/user/password
router.patch('api/user/password', apiUserCtrl.changePassword);

// POST /api/user
router.post('/api/user', apiUserCtrl.createUser);

// DELETE /api/user/{user_id}
router.delete('/api/user/{user_id}', apiUserCtrl.deleteUser);
