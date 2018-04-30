import { sendPage, sendData } from "../utils";
import { userModel } from "../models";
import { validator } from "../services";

// 获取登录页面
export async function getLoginPage(ctx) {

  // 若是已经登陆，则重定向到登陆首页
  if (ctx.user_id) {
    ctx.status = 302;
    if (ctx.is_manager) {
      ctx.set('Location', '/userd');
    } else {
      ctx.set('Location', '/course');
    }
  } else {
    // TODO 若是未登陆，则发送对应的网页
    sendPage(ctx, 200);
  }
}

// 登录
export async function login(ctx) {
  if (ctx.user_id) {  // 已经登陆，登陆失败
    sendData(ctx, 401, JSON.stringify({ message: '{您已经登录}' }));
  } else {
    // TODO 若是未登陆，则检查body参数
    const user_id = ctx.request.body.user_id,
      password = ctx.request.body.password;
    if (!user_id || !validator.is_userID(user_id)) {
      sendData(ctx, 401, JSON.stringify({ message: '{用户id格式错误}' }));
      return;
    }
    if (!password) {
      sendData(ctx, 401, JSON.stringify({ message: '{密码不能为空}' }));      
      return;
    }
    if (await userModel.getUserByUserId(user_id, password).length === 1 
    && ) {
      sendData(ctx, 200, JSON.stringify({ message: '{登录成功}' }));
    } else {
      sendData(ctx, 401, JSON.stringify({ message: '{用户名或密码错误}' }));      
    }
  }
}

// 登出
export async function logout(ctx, next) {
  if (ctx.user_id) {  // 已经登陆，登陆失败
    sendData(ctx, 401, JSON.stringify({ message: '{请先登录}' }));
  } else {
    // TODO 若是未登陆，则发送对应的网页
    sendPage(ctx, 200);
  }
}

// 老师修改密码
export async function changePassword(ctx, next) {
  const user = ctx.params.user;
  ctx.body = user + 'password';
  ctx.status = 200;
}

export async function getAllCoursesByTeacherID(ctx, next) {

}

// 仅管理员的权限 ----------------------------

// 获取所有老师列表
export async function getAllTeachersList(ctx, next) {

}

// 手动添加一个教师
export async function addTeacher(ctx, next) {

}

// 文件导入多个教师
export async function addTeachersFromFile(ctx, next) {

}

export async function deleteTeacher(ctx, next) {

}

export async function deleteAllTeachers(ctx, next) {

}
