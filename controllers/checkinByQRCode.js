import { sendPage, sendData } from '../utils';
import { validator } from '../services';
import { courseModel, studentModel } from '../models';




  // // 检查参数：课程id是否有效，checkid是否有效，学生姓名学号是否有效，学生是否在课程中
  // const course_id = ctx.params.course_id,
  //   student_id = ctx.request.body.student_id,
  //   student_name = ctx.request.body.student_name, 
  //   mac = ctx.request.body.mac,
  //   gps = ctx.request.body.gps;
  // if (!course_id || !student_id || !student_name || !mac || !gps 
  //   || !validator.is_courseID(course_id)
  //   || !validator.is_studentID(student_id)
  //   || await courseModel.getCourseByCourseID(course_id) !== 1) {
  //     sendData(ctx, 400, JSON.stringify({ message: '{签到失败}' }));
  // }
  // const students = await studentModel.getStudentNameByStudentId(student_id);
  // if (students.length !== 1 || students[0].student_name !== student_name) {
  //   sendData(ctx, 400, JSON.stringify({ message: '{签到失败}' }));    
  // }
  // // 
  // sendPage(ctx, 200, '');

