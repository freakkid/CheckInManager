import { execAsync } from './util';

export async function createCourseMemberTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS course_member (
    course_id        INT NOT NULL,
    student_id       VARCHAR(12) NOT NULL
    primary key (course_id, student_id)
    )`,
    undefined,
    'Table course_member created...');
}

export async function dropCourseMemberTable() {
  return await execAsync('DROP TABLE course_member', undefined, 'drop table course_member');
}

// export async function getCorse