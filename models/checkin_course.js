import { execAsync } from './util';

// 课程签到信息（待定：gps）
export async function createCheckinCourseTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_COURSE(
      checkin_id   VARCHAR(50) 	PRIMARY KEY NOT NULL,
      course_id    VARCHAR(50) 	NOT NULL,
      gps          VARCHAR(50) 	NOT NULL,
      date_time    DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`,
    undefined,
    'create CHECKIN_COURSE');
}

export async function dropCheckinCourseTable() {
  return await execAsync('DROP TABLE CHECKIN_COURSE', undefined, 'drop table CHECKIN_COURSE');
}

// 发起一次签到
export async function createCheckinCourse(checkin_course) {
  return await execAsync('INSERT INTO CHECKIN_COURSE (checkin_id, course_id) VALUES (?, ?)',
    [checkin_course.checkin_id, checkin_course.course_id],
    'create checkin_course ' + JSON.stringify(checkin_course));
}

// 获得课程id
export async function getCourseIDByCheckID(checkin_id) {
  return await execAsync('SELECT course_id FROM CHECKIN_COURSE WHERE checkin_id = ?',
    [checkin_id],
    `select course_id by checkin_id ${checkin_id}`);
}

// 获得gps信息
export async function getGpsByCheckID(checkin_id) {
  return await execAsync('SELECT gps FROM CHECKIN_COURSE WHERE checkin_id = ?',
    [checkin_id],
    `select gps by checkin_id ${checkin_id}`);
}
