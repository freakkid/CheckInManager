import { execAsync } from './util';

// 课程签到信息（待定：gps）
export async function createCheckinCourseTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_COURSE(
      checkin_id   VARCHAR(50) 	NOT NULL,
      course_id    VARCHAR(50) 	NOT NULL,
      date_time    DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL,
      is_closed    TINYINT(1)	  DEFAULT 0 NOT NULL,
      PRIMARY KEY (checkin_id, course_id)
    )`,
    undefined,
    'Table CHECKIN_COURSE created...');
}

export async function dropCourseTable() {
  return await execAsync('DROP TABLE COURSE', undefined, 'drop table COURSE');
}