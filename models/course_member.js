import { execAsync } from './util';

// 课程成员
export async function createCourseMemberTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS COURSE_MEMBER(
      course_id    VARCHAR(50) 	NOT NULL,
      student_id   VARCHAR(50) 	NOT NULL,
      PRIMARY KEY (course_id, student_id)
    )`,
    undefined,
    'Table COURSE_MEMBER created...');
}

export async function dropCourseMemberTable() {
  return await execAsync('DROP TABLE COURSE_MEMBER', undefined, 'drop table COURSE_MEMBER');
}

// export async function getCorse