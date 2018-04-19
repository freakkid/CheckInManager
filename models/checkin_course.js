import { execAsync } from './util';

// 课程签到信息（待定：gps）
export async function createCheckinCourseTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_COURSE(
      checkin_id   VARCHAR(50) 	PRIMARY KEY NOT NULL,
      course_id    VARCHAR(50) 	NOT NULL,
      date_time    DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`,
    undefined,
    'Table CHECKIN_COURSE created...');
}

export async function dropCheckinCourseTable() {
  return await execAsync('DROP TABLE CHECKIN_COURSE', undefined, 'drop table CHECKIN_COURSE');
}

// 发起一次签到
export async function createCheckinCourse(checkin_course) {
  return await execAsync(`INSERT INTO CHECKIN_COURSE (checkin_id, course_id) VALUES (?, ?)`,
    [checkin_course.checkin_id, checkin_course.course_id],
    'create checkin_course ' + JSON.stringify(checkin_course));
}

// 查看课程签到人数
export async function getCheckinStudentNumber(course_id) {
  return await execAsync(`INSERT INTO CHECKIN_STUDENT (checkin_id, student_id) VALUES (?, ?)`,
    [checkin_student.checkin_id, checkin_student.student_id],
    'create checkin_student ' + JSON.stringify(checkin_student));
}
