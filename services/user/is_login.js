import * as sessionService from './session';
import { userModel } from '../../models';
import { sendData, sendPage, logger } from '../../utils';

export async function is_login(ctx, next) {
  const session_id = ctx.cookies.get('key');
  let user_id, users;
  if (session_id) {
    user_id = await sessionService.getUserID(session_id);
  }
  if (user_id) {
    users = await userModel.getUsernameByUserID(user_id);
  }

  if (users && users.length === 1) {
    ctx.is_manager = users[0].is_manager;
    ctx.user_id = user_id;
  }
  return await next();
}
