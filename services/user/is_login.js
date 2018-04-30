import * as sessionService from './session';
import { userModel } from '../../models';
import { sendData, sendPage } from '../../utils';
import {userModel} from '../../models';

export async function is_login(ctx) {
  const session_id = ctx.request.header.sessionid,
  user_id = await sessionService.getSessionID(session_id),
  users = await userModel.getUsernameByUserID(user_id);
  if (users.length !== 1) {
    ctx.is_manager = users[0].is_manager;
    ctx.user_id = user_id;
  }
}
