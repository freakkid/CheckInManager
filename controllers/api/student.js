import { validator } from "../../services";
import { studentModel } from "../../models";

export async function deleteStudent(ctx) {
  if (ctx.is_manager === 1) {
    const student_id = ctx.params.student_id;
    if (!student_id || !validator.is_studentID(student_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
      return;
    }
    if ((await studentModel.getStudentNameByStudentId(student_id).length() === 0)) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该学生' }));
      return;
    }
    if ((await studentModel.deleteStudentByStudentId(student_id)).affectedRows === 1) {
      sendData(ctx, 204, JSON.stringify({ message: '删除成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '删除失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
