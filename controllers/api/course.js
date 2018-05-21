import { userModel, courseModel, courseMemberModel, studentModel } from '../../models';
import { validator } from '../../services';
import { sendData } from '../../utils';

export async function createCourse(ctx) {
  if (ctx.is_manager === 1) {
    const { course_name, credit, semester, class_time, position, user_id } = ctx.request.body;

    if (!course_name || !credit || !semester || !class_time || !position || !user_id) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await userModel.getUsernameByUserID(user_id)).length !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该用户id' }));
      return;
    }
    if ((await courseModel.createCourse({
      course_name: course_name, credit: credit, semester: semester,
      class_time: class_time, position: position, user_id: user_id
    })).affectedRows !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '创建课程失败' }));
    } else {
      sendData(ctx, 201, JSON.stringify({ message: '创建课程成功' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

export async function deleteCourse(ctx) {
  if (ctx.is_manager === 1) {
    const course_id = ctx.params.course_id;
    if (!validator.isCourseID(course_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请求失败' }));
      return;
    }
    if ((await courseModel.getUserIDByCourseID(course_id)).length !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该课程' }));
      return;
    }
    if ((await courseModel.deleteCourse(course_id)).affectedRows !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '删除课程失败' }));
    } else {
      await courseMemberModel.deleteAllCourseMember(course_id);
      sendData(ctx, 204, JSON.stringify({ message: '删除课程成功' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

export async function addCourseMember(ctx) {
  if (ctx.is_manager === 1) {
    const course_id = ctx.params.course_id;
    const { student_id, student_name } = ctx.request.body;

    if (!validator.isStudentName(student_name) || !validator.isCourseID(course_id) || !validator.isStudentID(student_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await courseModel.getUserIDByCourseID(course_id)).length !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该课程' }));
      return;
    }
    // 验证学生信息是否正确
    const t_students = await studentModel.getStudentNameByStudentId(student_id);
    if (t_students.length !== 1 || t_students[0].student_name !== student_name) {
      sendData(ctx, 400, JSON.stringify({ message: '学生信息错误' }));
      return;
    }
    // 判断学生是否已在课程中
    if ((await courseMemberModel.getACourseMember(student_id, course_id)).length > 0) {
      sendData(ctx, 400, JSON.stringify({ message: '该学生已在课程中' }));
      return;
    }
    if ((await courseMemberModel.insertCourseMember(course_id, student_id)).affectedRows !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '增加课程成员失败' }));
    } else {
      sendData(ctx, 201, JSON.stringify({ message: '增加课程成员成功' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

export async function deleteCourseMember(ctx) {
  if (ctx.is_manager === 1) {
    const { course_id, student_id } = ctx.params;

    if (!validator.isCourseID(course_id) || !validator.isStudentID(student_id)) {
      sendData(ctx, 400, JSON.stringify({ message: '请检查输入格式' }));
      return;
    }
    if ((await courseModel.getUserIDByCourseID(course_id)).length !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '不存在该课程' }));
      return;
    }
    if ((await studentModel.getStudentNameByStudentId(student_id)).length !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '学生信息错误' }));
      return;
    }

    if ((await courseMemberModel.deleteACourseMember(student_id, course_id)).affectedRows !== 1) {
      sendData(ctx, 400, JSON.stringify({ message: '删除课程成员失败' }));
    } else {
      sendData(ctx, 201, JSON.stringify({ message: '删除课程成员成功' }));
    }
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
