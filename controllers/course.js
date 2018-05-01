import { validator, checkinServ, getQRCode } from '../services';
import { sendPage, sendData } from '../utils';
import { userModel, courseModel, courseMemberModel, checkinStudentModel, checkinCourseModel } from '../models';

// TODO 所有的函数都需要修改sendPage()

/**
 * 老师主页面获取所教课程列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function courseListPage(ctx) {
  // TODO
  sendPage(ctx, 200, JSON.stringify(await courseModel.getAllCoursesList(ctx.user_id)));
}

/**
 * 老师选择某个课程信息
 * 
 * @export
 * @param {any} ctx
 */
export async function coursePage(ctx) {
  const course_id = ctx.params.course_id;

  if (!course_id || !validator.is_courseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  if ((await courseModel.getUserIDByCourseID(course_id)) !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  // TODO
  sendPage(ctx, 200, JSON.stringify(await courseModel.getCourseByCourseID()))
}

/**
 * 选择某个课程的学生列表
 * 
 * @export
 * @param {any} ctx
 */
export async function courseMemberPage(ctx) {
  const course_id = ctx.params.course_id;

  if (!course_id || !validator.is_courseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  if ((await courseModel.getUserIDByCourseID(course_id)) !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }

  // TODO
  sendPage(ctx, 200, JSON.stringify(await courseMemberModel.getCourseMember(course_id)));
}

/**
 * 老师选择某个课程的查看签到信息
 * 
 * @export
 * @param {any} ctx
 */
export async function checkinHistoryPage(ctx) {
  const course_id = ctx.params.course_id;

  if (!course_id || !validator.is_courseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  if ((await courseModel.getUserIDByCourseID(course_id)) !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }

  // TODO
  sendPage(ctx, 200, JSON.stringify(await checkinStudentModel.getAllCourseCheckin(course_id)));
}

/**
 * 点击某一条签到记录查看详细签到结果
 * 
 * @export
 * @param {any} ctx
 */
export async function checkinInfoPage(ctx) {
  const course_id = ctx.params.course_id,
    checkedin = ctx.params.checkedin;

  if (!course_id || !validator.is_courseID(course_id) || !checkedin) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  if ((await courseModel.getUserIDByCourseID(course_id)) !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  if ((await checkinCourseModel.getCourseIDByCheckID(checkedin)).course_id !== course_id) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const checkedin = await checkinStudentModel.getAllCourseCheckinStudent(course_id),
    checkedin_num = checkedin.length(),
    uncheckedin = await checkinStudentModel.getAllCourseUncheckinStudent(course_id),
    uncheckedin_num = uncheckedin.length();

  // TODO
    sendPage(ctx, 200, JSON.stringify({
    checkedin: checkedin, checkedin_num: checkedin_num,
    uncheckedin: uncheckedin, uncheckedin_num: uncheckedin_num
  }));
}

/**
 * 选择某个课程的发起签到
 * 
 * @export
 * @param {any} ctx
 */
export async function launchCheckinPage(ctx) {
  const course_id = ctx.params.course_id,
    gps = ctx.query.gps;
  if (!course_id || !validator.is_courseID(course_id)
    || !gps || !validator.is_gps(gps)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  if ((await courseModel.getUserIDByCourseID(course_id)) !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  // 查看当前课程是否有正在进行的签到，有则返回该checkinid生成的二维码
  // 没有则重新生成checkinid，新建签到记录，再返回正在checkinid生成的二维码
  var checkin_id = await checkinServ.getCheckinID(course_id);
  if (!checkin_id) {
    checkin_id = await checkinServ.set(course_id);
  }
  // TODO 不确定返回值
  getQRCode(generateCheckinURL(checkin_id));
  // TODO
  sendPage(ctx, 200);
}
