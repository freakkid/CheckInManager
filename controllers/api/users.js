import { sendData } from '../../utils';
import { validator, loginServ, logoutServ, md5Hash } from '../../services';
import { userModel } from '../../models';

export async function login(ctx) {
  if (ctx.user_id) {
    sendData(ctx, 400, JSON.stringify({ message: '您已经登陆' }));
    return;
  }

  const user_id = ctx.request.body.user_id,
    password = ctx.request.body.password;
  if (!password || password === '' || !validator.isUserID(user_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
    return;
  }

  if ((await userModel.getUserByUserId(user_id, md5Hash(password))).length !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '用户名或密码错误' }));
    return;
  }

  const sessionID = await loginServ(user_id);
  if (sessionID) {
    ctx.response.set('key', sessionID);
    sendData(ctx, 201, JSON.stringify({ message: '登录成功' }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登录失败' }));
  }
}


export async function logout(ctx) {
  if (await logoutServ(ctx.request.header.key, ctx.user_id)) {
    sendData(ctx, 204, JSON.stringify({ message: '登出成功' }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登出失败' }));
  }
}
