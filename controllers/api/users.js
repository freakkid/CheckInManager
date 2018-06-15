import { sendData } from '../../utils';
import { validator, loginServ, logoutServ, md5Hash } from '../../services';
import { userModel } from '../../models';

export async function login(ctx) {
  console.log('/api/users/session');
  console.log(ctx.user_id);
  console.log(ctx.request.user_id);
  console.log(ctx.request.body.user_id);
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
  console.log(user_id,password);
  console.log('check valid');
  if ((await userModel.getUserByUserId(user_id, md5Hash(password))).length !== 1) {
    console.log('wrong');
    sendData(ctx, 400, JSON.stringify({ message: '用户名或密码错误' }));
    return;
  }

  const sessionID = await loginServ(user_id);
  if (sessionID) {
    console.log('save session to database');
    console.log('cookie:',sessionID);
    //ctx.response.set('key', sessionID);
    ctx.cookies.set('key', sessionID);
    sendData(ctx, 201, JSON.stringify({ username: (await userModel.getUsernameByUserID(user_id))[0].username }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登录失败' }));
  }
}


export async function logout(ctx) {
  console.log('logout cookie',ctx.cookies.key);
  console.log('logout cookie',ctx.cookies.get('key'));
  //if (await logoutServ(ctx.request.header.key, ctx.user_id)) {
    if (await logoutServ(ctx.cookies.get('key'), ctx.user_id)) {
    sendData(ctx, 204, JSON.stringify({ message: '登出成功' }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登出失败' }));
  }
}
