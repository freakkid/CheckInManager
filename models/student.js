import { execAsync } from './util';

/**
 * 对所有学生进行操作
 * 学生信息 学号 姓名
 * 
 * @export
 * @returns 
 */
export async function createStudentTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS STUDENT(
      student_id   VARCHAR(50)  PRIMARY KEY	NOT NULL,
      student_name NVARCHAR(50) NOT NULL
    )`,
    undefined,
    'create STUDENT');
}

export async function dropStudentTable() {
  return await execAsync('DROP TABLE STUDENT', undefined, 'drop table STUDENT');
}

/**
 * 添加学生
 * 
 * @export
 * @param {any} student_id 
 * @param {any} student_name 
 * @returns 
 */
export async function createStudent(student_id, student_name) {
  return await execAsync('INSERT INTO STUDENT (student_id, student_name) VALUES (?, ?)',
    [student_id, student_name],
    `create student ${JSON.stringify({ student_id: student_id, student_name: student_name })}`);
}

/**
 * 根据学号查找学生姓名
 * 
 * @export
 * @param {any} student_id 
 * @returns 
 */
export async function getStudentNameByStudentId(student_id) {
  return await execAsync('SELECT student_name FROM STUDENT WHERE student_id = ?',
    [student_id],
    `select student by student_id ${student_id}`);
}

/**
 * 获取所有学生列表
 * 
 * @export
 * @returns 
 */
export async function getAllStudentsList() {
  return await execAsync('SELECT student_id, student_name FROM STUDENT',
    undefined,
    'select all students');
}

/**
 * 删除某个学生
 * 
 * @export
 * @param {any} student_id 
 * @returns 
 */
export async function deleteStudentByStudentId(student_id) {
  return await execAsync('DELETE FROM STUDENT WHERE student_id = ?',
    [student_id],
    `delete student by student_id ${student_id}`);
}

/**
 * 删除所有学生
 * 
 * @export
 * @returns 
 */
export async function deleteAllStudents() {
  await execAsync('DELETE FROM COURSE_MEMBER', undefined, 'delete all course member');
  return await execAsync('DELETE FROM STUDENT', undefined, 'delete all students');
}
