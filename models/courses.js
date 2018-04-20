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
    'create COURSE ...');
}

export async function dropCourseTable() {
  return await execAsync('DROP TABLE COURSE', undefined, 'drop table COURSE');
}

// 获得某个教师的所有课程列表
export async function getAllCoursesList(user_id) {
  return await execAsync(`SELECT course_id, course_name, semester FROM COURSE WHERE user_id = ?`,
  [user_id],
  `select course by user_id ${user_id}`);
}

// 获取某个课程信息
export async function getCourseByCourseID(course_id) {
  return await execAsync(
  `SELECT course_name, credit, semester, class_time, position, student_num, teacher_name
   FROM COURSE
    LEFT JOIN USER
      ON COURSE.user_id = USER.user_id
    LEFT JOIN
      (SELECT course_id, COUNT(student_id) AS student_num
        FROM COURSE_MEMBER
        GROUP BY course_id
      ) AS COURSE_STUDENT_NUM
      ON COURSE.course_id = COURSE_STUDENT_NUM.course_id
   WHERE course_id = ?`,
  [course_id],
  `select course by course_id ${course_id}`);
}

// 获取课程的老师id
export async function getUserIDByCourseID(course_id) {
  return await execAsync('SELECT user_id FROM COURSE WHERE course_id = ?',
  [course_id],
  `select user_id by course_id ${course_id}`);
}

// 管理员的权限 ----------------------------

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
