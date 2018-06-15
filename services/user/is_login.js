import * as sessionService from './session';
import { userModel } from '../../models';
import { sendData, sendPage, logger } from '../../utils';

export async function is_login(ctx, next) {
   //console.log('你在login这里')
  //const session_id = ctx.request.header.key;
  const session_id = ctx.cookies.get('key');
  //console.log(session_id);
  let user_id, users;
  if (session_id) {
    user_id = await sessionService.getUserID(session_id);
    //console.log('user_id',user_id)
  }
  if (user_id) {
    users = await userModel.getUsernameByUserID(user_id);
    // console.log(users)
  }

  if (users && users.length === 1) {
    ctx.is_manager = users[0].is_manager;
    ctx.user_id = user_id;
    //console.log('ctx.user_id',ctx.user_id)
    // console.log(ctx.is_manager)
  }
  return await next();
}
