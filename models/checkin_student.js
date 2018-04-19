import { execAsync } from './util';

// 学生签到信息（待定：gps,ip,mac）
export async function createCheckinStudentTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_STUDENT(
      checkin_id   VARCHAR(50) 	NOT NULL,
      student_id   VARCHAR(50) 	NOT NULL,
      PRIMARY KEY (checkin_id, student_id)
    )`,
    undefined,
    'Table CHECKIN_STUDENT created...');
}

export async function dropCheckinStudentTable() {
  return await execAsync('DROP TABLE CHECKIN_STUDENT', undefined, 'drop table CHECKIN_STUDENT');
}