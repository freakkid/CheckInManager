import { studentModel } from '../models';
/**
 * 管理员手动添加全级学生的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function studentListPage(ctx) {
  if (ctx.is_manager === 1) {
    // TODO
    sendPage(ctx, 200, JSON.stringify(await studentModel.getAllStudentsList()));
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
