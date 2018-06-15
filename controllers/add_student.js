import { sendPage, sendData } from '../utils';
/**
 * 管理员手动添加全级学生的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function addStudentPage(ctx) {
  if (ctx.is_manager === 1) {
    // TODO
    sendData(ctx, 200, JSON.stringify({ message: '管理员手动添加全级学生的页面' }),'addAllStudentPage');
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
