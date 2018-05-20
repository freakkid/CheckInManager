import Router from 'koa-router';
import { apiUsersCtrl } from '../../controllers';
import { blockUnsignedVisitors } from '../../services';


export const router = new Router();

// api：POST /api/users/session
router.post('/session', apiUsersCtrl.login);

console.log('不科学')
router.use(blockUnsignedVisitors);

// api: DELETE /api/users/session
router.delete('/session', apiUsersCtrl.logout);
