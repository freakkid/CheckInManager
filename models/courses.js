import { execAsync } from './util';

export async function createCourseTable() {
  // semester      2017-2018学年度第一学期
  // credit        学分
  // venue         上课地点
  // class_time    上课时间
  // is_closed     课程是否已经结束
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS courses (
    course_id        INT AUTO_INCREMENT PRIMARY KEY,
    course_name      NVARCHAR(100) NOT NULL,
    teacher_id       VARCHAR(12) NOT NULL,
    credit           INT NOT NULL,
    semester         NVARCHAR(100) NOT NULL,
    class_time       DATETIME NOT NULL,
    venue            NVARCHAR(100) NOT NULL,
    is_closed        BOOL DEFAULT false NOT NULL
    )`,
    undefined,
    'Table courses created...');
}

export async function dropCourseTable() {
  return await execAsync('DROP TABLE courses', undefined, 'drop table courses');
}

export async function createCourse(course) {
  return await execAsync(`INSERT INTO courses
  (course_id, course_name, teacher_id, credit, semester, class_time, venue) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [course.course_id, course.course_name, course.teacher_id, course.credit,
    course.semester, course.class_time, course.venue],
    'create course ' + JSON.stringify(course));
}

export async function getCourseInfo(course_id, user_id) {
  return await execAsync(`SELECT course_id, course_name, teacher_id, credit, semester, class_time, venue
  FROM courses WHERE course_id = ?`,
    [course_id],
    `select course by course_id ${course_id}`);
}

export async function getCourseListByTeacher(user_id) {
  return await execAsync(`SELECT course_id, course_name, is_closed FROM courses WHERE teacher_id = ?`,
  [user_id],
  `select course by teacher_id ${user_id}`);
}

export async function getCoursenameByCourseID(course_id) {
  return await execAsync('SELECT course_name FROM courses WHERE course_id = ?',
    [course_id],
    `select course by course_id ${course_id}`);
}

export async function changePassword(new_password, course_id, password) {
  return await execAsync('UPDATE courses SET password = ? WHERE course_id = ? AND password = ?',
    [new_password, course_id, password],
    `update course [course_id: ${course_id}, password: ${password}]`);
}

export async function deleteCourse(course_id, password) {
  return await execAsync('DELETE FROM courses WHERE course_id = ? AND password = ?',
    [course_id, password],
    `delete course [course_id: ${course_id}]`);
}