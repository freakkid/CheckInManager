import { execAsync } from './util';

// 课程信息
export async function createCourseTable() {
  // semester      2017-2018学年度第一学期
  // credit        学分
  // position      上课地点
  // class_time    上课时间
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS COURSE(
      course_id     VARCHAR(50)   PRIMARY KEY NOT NULL,
      course_name	  NVARCHAR(255) NOT NULL,
      user_id   	  VARCHAR(50)   NOT NULL,
      credit        INT NOT NULL,
      semester  	  NVARCHAR(255) NOT NULL,
      class_time	  NVARCHAR(255) NOT NULL,
      position	    NVARCHAR(255) NOT NULL
    )`,
    undefined,
    'Table COURSE created...');
}

export async function dropCourseTable() {
  return await execAsync('DROP TABLE COURSE', undefined, 'drop table COURSE');
}

// 获得某个教师的所有课程列表
export async function getAllCoursesList(user_id) {
  return await execAsync(`SELECT course_id, course_name, is_closed FROM COURSE WHERE user_id = ?`,
  [user_id],
  `select course by user_id ${user_id}`);
}

// //
// export async function getCourseNameByCourseID(course_id) {
//   return await execAsync('SELECT course_name FROM COURSE WHERE course_id = ?',
//     [course_id],
//     `select course by course_id ${course_id}`);
// }

// 创建新课程
export async function createCourse(course) {
  return await execAsync(`INSERT INTO COURSE
  (course_id, course_name, user_id, credit, semester, class_time, position) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [course.course_id, course.course_name, course.user_id, course.credit,
    course.semester, course.class_time, course.position],
    'create course ' + JSON.stringify(course));
}

// 删除某老师的某一门课程
export async function deleteCourse(user_id, course_id) {
  return await execAsync('DELETE FROM COURSE WHERE user_id = ? AND course_id = ?',
    [user_id, course_id],
    `delete course by user_id ${user_id} and course_id ${course_id}`);
}

// 删除某老师的所有课程
export async function deleteAllCourses(user_id) {
  return await execAsync('DELETE FROM COURSE WHERE user_id = ?',
    [user_id],
    `delete course by user_id ${user_id}`);
}

// 添加某课程的学生
export async function addCourseMember(course_id, student_id) {
  return await execAsync('INSERT INTO COURSE_MEMBER WHERE course_id = ? AND student_id = ?',
    [course_id, student_id],
    `delete course by user_id ${user_id}`);
}