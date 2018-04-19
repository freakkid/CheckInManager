import { execAsync } from './util';


// 学生信息 学号 姓名
export async function createStudentTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS STUDENT(
      student_id   VARCHAR(50)  PRIMARY KEY	NOT NULL,
      student_name NVARCHAR(50) NOT NULL
    )`,
    undefined,
    'Created STUDENT Table');
}

export async function dropStudentTable() {
  return await execAsync('DROP TABLE STUDENT', undefined, 'drop table STUDENT');
}

export async function createStudent(student) {
  return await execAsync(`INSERT INTO STUDENT
  (student_id, student_name) VALUES (?, ?)`,
    [student.student_id, student.student_name],
    'create student ' + JSON.stringify(student));
}

export async function getStudentByStudentId(student_id) {
  return await execAsync(`SELECT student_id, student_name FROM STUDENT WHERE student_id = ?`,
    [student_id],
    `select student by student_id ${student_id}`);
}

