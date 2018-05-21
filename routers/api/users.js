import Router from 'koa-router';
import { apiUsersCtrl } from '../../controllers';
import { blockUnsignedVisitors, validator, md5Hash } from '../../services';
import { sendData } from '../../utils';
import { userModel } from '../../models';


export const router = new Router();

// api：POST /api/users/session
router.post('/session', apiUsersCtrl.login);

router.use(blockUnsignedVisitors);

// api: DELETE /api/users/session
router.delete('/session', apiUsersCtrl.logout);
