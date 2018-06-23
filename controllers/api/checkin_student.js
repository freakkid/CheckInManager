import { checkinServ, validator } from '../../services';
import { courseModel, courseMemberModel, checkinStudentModel, studentModel, checkinCourseModel } from '../../models';
import { sendData } from '../../utils';

/**
 * 学生输入：姓名+学号进行签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function studentCheckin(ctx) {
  const checkin_id = ctx.params.checkin_id,
    { student_name, student_id } = ctx.request.body,
    course_id = await checkinServ.getCourseID(checkin_id);
    //console.log('学生扫码后输入学号姓名，处理逻辑');
    //console.log('checkin_id',checkin_id);
    //console.log('student_name',student_name);
    //console.log('student_id',student_id);
  if (!checkin_id || !validator.isCourseID(course_id) || (await courseModel.getUserIDByCourseID(course_id)).length !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '该页面已失效' }));
    return;
  }
  if (!validator.isStudentID(student_id) || !validator.isStudentName(student_name)) {
    sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
    return;
  }

  const students = await studentModel.getStudentNameByStudentId(student_id);
  if (students.length === 0 || students[0].student_name !== student_name) {
    sendData(ctx, 400, JSON.stringify({ message: '输入的学号姓名有误' }));
    return;
  }

  if ((await checkinStudentModel.checkIfStudentInCheckinCourse(student_id, student_name, checkin_id)).length !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '您不在该课程中' }));
    return;
  }

  if ((await checkinStudentModel.getOneStudentCheckin(student_id, checkin_id)).length > 0) {
    sendData(ctx, 400, JSON.stringify({ message: '不能重复签到' }));
    return;
  }

  if ((await checkinStudentModel.createCheckinStudent(student_id, checkin_id)).affectedRows !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '签到失败' }));
  } else {
    sendData(ctx, 201, JSON.stringify({ message: '签到成功' }));
  }
}


/**
 * 老师实时查看当前签到人数
 * 
 * @export
 * @param {any} ctx 
 */
export async function getCheckinNum(ctx) {
  const checkin_id = ctx.params.checkin_id,
    course_ids = await checkinCourseModel.getCourseIDByCheckID(checkin_id);

  if (!checkin_id || course_ids.length === 0 || !validator.isCourseID(course_ids[0].course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const course_id = course_ids[0].course_id,
    users = await courseModel.getUserIDByCourseID(course_id);
  if (users.length !== 1 || users[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您无权查看该课程信息' }));
    return;
  }

  const checkined = await checkinStudentModel.getStudentNumInCheckinStudent(checkin_id);
  sendData(ctx, 200, JSON.stringify({ checkined: checkined.length === 0 ? 0 : checkined[0].checkedin_num }));
}

/**
 * 老师点击结束签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function stopCheckin(ctx) {
  const checkin_id = ctx.params.checkin_id,
    course_ids = await checkinCourseModel.getCourseIDByCheckID(checkin_id);

  if (!checkin_id || course_ids.length === 0 || !validator.isCourseID(course_ids[0].course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const course_id = course_ids[0].course_id,
    users = await courseModel.getUserIDByCourseID(course_id);
  if (users.length !== 1 || users[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您无权查看该课程信息' }));
    return;
  }

  await checkinServ.del(checkin_id, course_id);
  sendData(ctx, 204);
}
