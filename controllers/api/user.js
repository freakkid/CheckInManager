// 登录
export async function login(ctx) {
  if (ctx.user_id) {  // 已经登陆，登陆失败
    sendData(ctx, 400, JSON.stringify({ message: '{您已经登录}' }));
  } else {
    // TODO 若是未登陆，则检查body参数
    const user_id = ctx.request.body.user_id,
      password = ctx.request.body.password;
    if (!user_id || !validator.is_userID(user_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '{用户id格式错误}' }));
      return;
    }
    if (!password) {
      sendData(ctx, 401, JSON.stringify({ message: '{用户名或密码错误}' }));
      return;
    }
    if (await userModel.getUserByUserId(user_id, password).length === 1 
    && ) {
      sendData(ctx, 200, JSON.stringify({ message: '{登录成功}' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '{用户名或密码错误}' }));      
    }
  }
}

// 登出
export async function logout(ctx) {
  if (ctx.user_id) {  // 已经登陆，登陆失败
    sendData(ctx, 400, JSON.stringify({ message: '{请先登录}' }));
  } else {
    // TODO 若是未登陆，则发送对应的网页
    sendPage(ctx, 200);
  }
}
