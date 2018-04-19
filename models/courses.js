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

export async function createCourse(course) {
  return await execAsync(`INSERT INTO COURSE
  (course_id, course_name, user_id, credit, semester, class_time, position) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [course.course_id, course.course_name, course.user_id, course.credit,
    course.semester, course.class_time, course.position],
    'create course ' + JSON.stringify(course));
}

export async function getCourseListByTeacher(user_id) {
  return await execAsync(`SELECT course_id, course_name, is_closed FROM COURSE WHERE teacher_id = ?`,
  [user_id],
  `select course by teacher_id ${user_id}`);
}

export async function getCoursenameByCourseID(course_id) {
  return await execAsync('SELECT course_name FROM COURSE WHERE course_id = ?',
    [course_id],
    `select course by course_id ${course_id}`);
}

export async function deleteCourse(course_id, password) {
  return await execAsync('DELETE FROM COURSE WHERE course_id = ? AND password = ?',
    [course_id, password],
    `delete course [course_id: ${course_id}]`);
}