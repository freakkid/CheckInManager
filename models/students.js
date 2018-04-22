import { execAsync } from './util';

// 对所有学生进行操作

// 学生信息 学号 姓名
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

// 添加学生
export async function createStudent(student) {
  return await execAsync(`INSERT INTO STUDENT
  (student_id, student_name) VALUES (?, ?)`,
    [student.student_id, student.student_name],
    'create student ' + JSON.stringify(student));
}

// 根据学号查找学生姓名
export async function getStudentNameByStudentId(student_id) {
  return await execAsync(`SELECT student_name FROM STUDENT WHERE student_id = ?`,
    [student_id],
    `select student by student_id ${student_id}`);
}

// 获取所有学生列表
export async function getAllStudentsList() {
  return await execAsync(`SELECT student_id, student_name FROM STUDENT`,
    undefined,
    `select all students`);
}

// 删除某个学生
export async function deleteStudentByStudentId(student_id) {
  return await execAsync(`DELETE FROM STUDENT WHERE student_id = ?`,
    [student_id],
    `delete student by student_id ${student_id}`);
}

// 删除所有学生
export async function deleteAllStudents() {
  return await execAsync(`DELETE FROM STUDENT`, undefined, `delete all students`);
}
