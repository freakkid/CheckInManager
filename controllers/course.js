import { validator, checkinServ } from '../services';
import { sendPage, sendData } from '../utils';
import { userModel, courseModel, courseMemberModel, checkinStudentModel, checkinCourseModel } from '../models';
import { generateCheckinURL } from '../services/checkin/checkin';


/**
 * 老师主页面获取所教课程列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function courseListPage(ctx) {
  sendPage(ctx, 200, JSON.stringify({ courses: await courseModel.getAllCoursesList(ctx.user_id) }),'courseList');
}

/**
 * 老师选择某个课程信息
 * 
 * @export
 * @param {any} ctx
 */
export async function coursePage(ctx) {
  const course_id = ctx.params.course_id;
  if (!validator.isCourseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const user_ids = await courseModel.getUserIDByCourseID(course_id);
  if (user_ids.length === 0 || user_ids[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  sendPage(ctx, 200, JSON.stringify((await courseModel.getCourseByCourseID(course_id))[0]),'courseDetail');
}

/**
 * 选择某个课程的学生列表
 * 
 * @export
 * @param {any} ctx
 */
export async function courseMemberPage(ctx) {
  const course_id = ctx.params.course_id;

  if (!validator.isCourseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const user_ids = await courseModel.getUserIDByCourseID(course_id);
  if (user_ids.length === 0 || user_ids[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }

  const course_member = await courseMemberModel.getCourseMember(course_id);
  sendPage(ctx, 200, JSON.stringify({ course_member: course_member, course_member_num: course_member.length }),'studentNameListPage');
}

/**
 * 老师选择某个课程的查看签到信息
 * 
 * @export
 * @param {any} ctx
 */
export async function checkinHistoryPage(ctx) {
  const course_id = ctx.params.course_id;
  //console.log(course_id);

  if (!validator.isCourseID(course_id)) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const user_ids = await courseModel.getUserIDByCourseID(course_id);
  if (user_ids.length === 0 || user_ids[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }

  sendPage(ctx, 200, JSON.stringify({ checkin_history: await checkinStudentModel.getAllCourseCheckin(course_id) }) , 'checkAttendancePage');
}

/**
 * 点击某一条签到记录查看详细签到结果
 * 
 * @export
 * @param {any} ctx
 */
export async function checkinInfoPage(ctx) {
  const course_id = ctx.params.course_id,
    checkin_id = ctx.params.checkin_id;

  // 检查course_id和checkin_id格式
  if (!validator.isCourseID(course_id) || !checkin_id) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  // 检查用户对这个course_id是否有权限
  const user_ids = await courseModel.getUserIDByCourseID(course_id);
  if (user_ids.length === 0 || user_ids[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  // 检查checkin_id是否属于这个课程
  const course_ids = await checkinCourseModel.getCourseIDByCheckID(checkin_id);
  if (course_ids.length === 0 || course_ids[0].course_id !== course_id) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const checkedin = await checkinStudentModel.getAllCourseCheckinStudent(checkin_id),
    checkedin_num = checkedin.length,
    uncheckedin = await checkinStudentModel.getAllCourseUncheckinStudent(checkin_id),
    uncheckedin_num = uncheckedin.length;

  
  sendPage(ctx, 200, JSON.stringify({
    checkedin: checkedin, checkedin_num: checkedin_num,
    uncheckedin: uncheckedin, uncheckedin_num: uncheckedin_num
  }),'singleAttendancePage');
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
  if (!validator.isCourseID(course_id)
    //|| !gps || !validator.isGps(gps)
    ) {
    sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
    return;
  }

  const user_ids = await courseModel.getUserIDByCourseID(course_id);
  if (user_ids.length === 0 || user_ids[0].user_id !== ctx.user_id) {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
    return;
  }
  // 查看当前课程是否有正在进行的签到，有则返回该checkinid生成的二维码
  // 没有则重新生成checkinid，新建签到记录，再返回正在checkinid生成的二维码
  var checkin_id = await checkinServ.getCheckinID(course_id);
  if (!checkin_id) {
    checkin_id = await checkinServ.set(course_id);
    
    if ((await checkinCourseModel.createCheckinCourse(checkin_id, course_id, gps)).affectedRows === 0) {
      
      sendData(ctx, 400, JSON.stringify({ message: '发起签到失败qaq' }));
    }
  }
  sendPage(ctx, 200, JSON.stringify({ checkinURL: generateCheckinURL(checkin_id) }),'attendancePage');


}
