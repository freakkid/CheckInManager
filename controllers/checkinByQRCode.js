import { sendPage } from '../utils';
import { validator } from '../services';

// 会判断是否当前课程是否有【未结束】的二维码签到，
// 有则返回为结束的二维码图片，无则后台调用api根据【course_id+当前时间】=>【hash字符串】hash字符串，生成一个二维码图片，返回给前端页面，半小时后无效
export async function getQRcodePage(ctx) {
  // TODO
  const course_id = ctx.params.course_id;
  if (validator.is_courseID(course_id))
  // 
  sendPage(ctx, 200, '');
}

