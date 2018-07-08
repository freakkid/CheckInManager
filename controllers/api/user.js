import { validator, md5Hash } from '../../services';
import { userModel } from '../../models';
import { sendData } from '../../utils';

export async function changePassword(ctx) {
  if (ctx.is_manager === 0) {
    let old_password = ctx.request.body.old_password,
      password = ctx.request.body.password;
    if (!old_password || old_password === '' || !validator.isPassword(password)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }

    old_password = md5Hash(old_password);
    password = md5Hash(password);

    if ((await userModel.getUserByUserId(ctx.user_id, old_password)).length !== 1) {
      sendData(ctx, 401, JSON.stringify({ message: '密码错误' }));
      return;
    }
    if ((await userModel.changePassword(password, ctx.user_id, old_password)).affectedRows !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '修改密码失败' }));
    } else {
      sendData(ctx, 201, JSON.stringify({ message: '修改密码成功' }));
    }
  } else {
    sendData(ctx, 400, JSON.stringify({ message: '修改密码失败' }));
  }
}

export async function createUser(ctx) {
  if (ctx.is_manager === 1) {
    const username = ctx.request.body.username,
      user_id = ctx.request.body.user_id;
    if (!validator.isUsername(username) || !validator.isUserID(user_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await userModel.getUsernameByUserID(user_id)).length > 0) {
      sendData(ctx, 400, JSON.stringify({ message: '存在相同id的用户' }));
      return;
    }

    if ((await userModel.createUser({ user_id: user_id, username: username, password: md5Hash(user_id) })).affectedRows === 1) {
      sendData(ctx, 201, JSON.stringify({ message: '添加用户成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '添加用户失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

export async function deleteUser(ctx) {
  if (ctx.is_manager === 1) {
    const user_id = ctx.params.user_id;
    if (!validator.isUserID(user_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await userModel.getUsernameByUserID(user_id).length === 0)) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该用户' }));
      return;
    }
    if ((await userModel.deleteUser(user_id)).affectedRows === 1) {
      sendData(ctx, 204, JSON.stringify({ message: '删除用户成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '删除用户失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
