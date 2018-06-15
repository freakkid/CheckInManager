import Router from 'koa-router';
import { apiUserCtrl } from '../../controllers';
import { sendData } from '../../utils';

export const router = new Router();


// PATCH  api/user/change_password
router.patch('/password', apiUserCtrl.changePassword);

// POST /api/user
router.post('/', apiUserCtrl.createUser);

// DELETE /api/user/{user_id}
router.delete('/:user_id', apiUserCtrl.deleteUser);
