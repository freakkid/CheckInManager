import Router from 'koa-router';
import { apiUserCtrl } from '../../controllers';

export const router = new Router();

// PATCH  api/user/password
router.patch('/password', apiUserCtrl.changePassword);

// POST /api/user
router.post('/', apiUserCtrl.createUser);

// DELETE /api/user/{user_id}
router.delete('/{user_id}', apiUserCtrl.deleteUser);
