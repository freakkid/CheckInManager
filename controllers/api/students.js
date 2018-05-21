import { studentModel } from '../../models';
import { sendData } from '../../utils';

export async function deleteAllStudents(ctx) {
  if (ctx.is_manager === 1) {
    if ((await studentModel.deleteAllStudents()).affectedRows > 0) {
      sendData(ctx, 204, JSON.stringify({ message: '删除成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '删除失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
