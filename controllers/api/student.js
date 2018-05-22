import { validator } from '../../services';
import { studentModel, courseMemberModel } from '../../models';
import { sendData } from '../../utils';
import { courseCtrl } from '..';

/**
 * 管理员手动删除全级学生
 * 
 * @export
 * @param {any} ctx 
 * @returns 
 */
export async function deleteStudent(ctx) {
  if (ctx.is_manager === 1) {
    const student_id = ctx.params.student_id;
    if (!validator.isStudentID(student_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
      return;
    }
    if ((await studentModel.getStudentNameByStudentId(student_id)).length === 0) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该学生' }));
      return;
    }
    if ((await studentModel.deleteStudentByStudentId(student_id)).affectedRows === 1) {
      // 在该学生所在的课程删除该生记录
      await courseMemberModel.deleteCourseMember(student_id);
      sendData(ctx, 204, JSON.stringify({ message: '删除成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '删除失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 管理员手动添加全级学生
 * 
 * @export
 * @param {any} ctx 
 */
export async function addStudent(ctx) {
  if (ctx.is_manager === 1) {
    const student_id = ctx.request.body.student_id,
      student_name = ctx.request.body.student_name;

    if (!validator.isStudentID(student_id) || !validator.isStudentName(student_name)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await studentModel.getStudentNameByStudentId(student_id)).length > 0) {
      sendData(ctx, 400, JSON.stringify({ message: '该学号已存在' }));
      return;
    }

    if ((await studentModel.createStudent(student_id, student_name)).affectedRows === 1) {
      sendData(ctx, 201, JSON.stringify({ message: '添加成功' }));
    } else {
      sendData(ctx, 400, JSON.stringify({ message: '添加失败' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
