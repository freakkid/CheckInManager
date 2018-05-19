import { checkinServ, validator } from '../../services';
import { courseModel, courseMemberModel, checkinStudentModel, studentModel, checkinCourseModel } from '../../models';

/**
 * 学生输入：姓名+学号进行签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function studentCheckin(ctx) {
  const checkin_id = ctx.params.checkin_id,
    { student_name, student_id } = ctx.body,
    course_id = await checkinServ.getCourseID(checkin_id);

  if (!checkin_id || !validator.isCourseID(course_id) || (await courseModel.getUserIDByCourseID(course_id)).length !== 1) {
    return;
  }
  if (!validator.isStudentID(student_id) || !validator.isStudentName(student_name)) {
    sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
    return;
  }
  const students = await studentModel.getStudentNameByStudentId(student_id);
  if (students.length !== 1 || students[0].student_name === student_name) {
    sendData(ctx, 400, JSON.stringify({ message: '输入的学号姓名有误' }));
    return;
  }
  if ((await checkinStudentModel.checkIfStudentInCheckinCourse(student_id, student_name, checkin_id)).length !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '您不在该课程中' }));
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
    course_id = await checkinCourseModel.getCourseIDByCheckID(checkin_id);

  if (!checkin_id || !validator.isCourseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  const users = await courseModel.getUserIDByCourseID(course_id);
  if (users.length !== 1 || users[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您无权查看该课程信息' }));
    return;
  }

  const checkined = await checkinStudentModel.getStudentNumInCheckinStudent(checkin_id);
  if (checkined.length !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
  } else {
    sendData(ctx, 200, JSON.stringify({ checkined: checkined[0].checkedin_num }));
  }
}

/**
 * 老师点击结束签到
 * 
 * @export
 * @param {any} ctx 
 */
export async function stopCheckin(ctx) {
  const checkin_id = ctx.params.checkin_id,
    course_id = await checkinCourseModel.getCourseIDByCheckID(checkin_id);

  if (!validator.isCourseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }
  const users = await courseModel.getUserIDByCourseID(course_id);
  if (users.length !== 1 || users[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您无权查看该课程信息' }));
    return;
  }

  if ((await checkinServ.del(checkin_id)) !== 1) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
  } else {
    sendData(ctx, 204);
  }
}
