import { sendPage, sendData } from '../utils';
import { validator, checkinServ } from '../services';
import { courseModel, studentModel } from '../models';
/**
 * 学生扫二维码获取的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function QRCodeUrlPage(ctx) {
  //console.log('学生扫码后，返回输入学号界面check in');
  const checkin_id = ctx.params.checkin_id;
  if (!checkin_id || !await checkinServ.getCourseID(checkin_id)) {
    //console.log('学生扫码后，您请求的页面已失效');
    sendData(ctx, 400, JSON.stringify({ message: '您请求的页面已失效' }));
  } else {
    sendPage(ctx, 200, JSON.stringify({ message: '发送填写签到信息的页面' }), 'student_checkin');
  }
}



