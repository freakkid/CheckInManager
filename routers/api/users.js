import Router from 'koa-router';
import { apiUsersCtrl } from '../../controllers';


export const router = new Router();

// api：POST /api/users/session
router.post('/api/users/session', apiUsersCtrl.login);

// api: DELETE /api/users/session
router.delete('/api/users/session', apiUsersCtrl.logout);
