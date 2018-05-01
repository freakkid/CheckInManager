import { sendData } from "../../utils";
import { validator, loginServ, logoutServ, sessionServ } from "../../services";
import { userModel } from "../../models";

export async function login(ctx) {
  const user_id = ctx.body.user_id,
    password = ctx.body.password;
  if (!user_id || !password || validator.is_userID(password)) {
    sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
    return;
  }
  if (await userModel.getUserByUserId(user_id, password).length !== 1) {
    sendData(ctx, 401, JSON.stringify({ message: '用户名或密码错误' }));
    return;
  }
  if (loginServ(user_id)) {
    sendData(ctx, 201, JSON.stringify({ message: '登录成功' }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登录失败' }));
  }
}

export async function logout(ctx) {
  if (logoutServ(ctx.request.header.sessionid)) {
    sendData(ctx, 204, JSON.stringify({ message: '登出成功' }));
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '登出失败' }));
  }
}
