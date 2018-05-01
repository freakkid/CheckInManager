import { studentModel } from "../models";

export async function studentList(ctx) {
  if (ctx.is_manager === 1) {
    // TODO
    sendPage(ctx, 200, JSON.stringify(await studentModel.getAllStudentsList()));
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}