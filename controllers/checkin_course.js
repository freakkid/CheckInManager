import { sendPage, sendData } from "../utils";
import { validator, getQRCode, checkinServ } from "../services";
import { courseModel } from "../models";
import { hostname } from "os";
import { port } from "../config";

// 老师获取二维码
// 会判断是否当前课程是否有【未结束】的二维码签到，
// 有则返回二维码图片，
// 无则后台调用api根据【course_id+当前时间】=>【hash字符串】hash字course_id+当前时间】=>【hash字符串】hash字符串
// 生成一个二维码图片，返回给前端页面，半小时后无效
export async function getQRcodePage(ctx) {
  // TODO
  const course_id = ctx.params.course_id,
    user_id = ctx.user_id,
    gps = ctx.query.gps;
  // 课程id和gps格式是否有误
  // TODO gps的格式校验
  if (!course_id || !validator.is_courseID(course_id) || !gps) {
    sendData(ctx, 401, JSON.stringify({'message':'请求二维码失败'}));
  }
  // 发起签到请求的用户是否为任课教师
  const users = courseModel.getUserIDByCourseID(course_id);
  if (users.length !== 1 || users[0].user_id !== user_id) {
    sendData(ctx, 401, JSON.stringify({'message':'请求二维码失败'}));    
  }
  // 是否正在进行签到
  var checkinID = await checkinServ.getCheckinID(course_id);
  if (!checkinID) { // 没有正在进行的签到
    checkinID = await checkinServ.set(course_id);
  }
  const checkinUrl = `${hostname}:${port}/checkinByQRCode/${checkinID}`;
  // TODO 不知道
  getQRCode(checkinUrl);

  // TODO 把请求获得的图片放进去
  sendPage(ctx, 200)
}