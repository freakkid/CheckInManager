import { execAsync } from './util';

// 学生签到信息
export async function createCheckinStudentTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS CHECKIN_STUDENT(
      checkin_id          VARCHAR(50)  NOT NULL,
      student_id          VARCHAR(50)  NOT NULL,
      checkined_datetime  DATETIME     DEFAULT CURRENT_TIMESTAMP NOT NULL,
      mac                 VARCHAR(50),
      PRIMARY KEY (checkin_id, student_id)
    )`,
    undefined,
    'create CHECKIN_STUDENT');
}

export async function dropCheckinStudentTable() {
  return await execAsync('DROP TABLE CHECKIN_STUDENT', undefined, 'drop table CHECKIN_STUDENT');
}

// 学生进行签到 插入签到数据：学号 签到id
export async function createCheckinStudent(student_id, checkin_id) {
  return await execAsync(
    `INSERT INTO CHECKIN_STUDENT (student_id, checkin_id) VALUES (?, ?)`,
    [student_id, checkin_id],
    `insert checkin data by student_id ${student_id} and checkin_id ${checkin_id}`
  );
}

/**
 * 获得课程所有签到历史记录
 * 返回 checkin_id 签到日期【yyyy-mm-dd hh:mm:ss】 签到人数 未签到人数
 * 按签到日期递减顺序排列
 * 
 * @export
 * @param {any} course_id 
 * @returns 
 */
export async function getAllCourseCheckin(course_id) {
  return await execAsync(
    `SELECT CHECKIN_COURSE.checkin_id, date_time, checkedin_num, (couser_member_num - checkedin_num) AS uncheckedin_num
      FROM
        ((SELECT COUNT(student_id) AS checkedin_num, checkin_id
          FROM CHECKIN_STUDENT
          GROUP BY checkin_id
        ) AS CHECKEDIN_COUNT
      LEFT JOIN CHECKIN_COURSE
        ON CHECKIN_COURSE.checkin_id = CHECKEDIN_COUNT.checkin_id
      LEFT JOIN
        (SELECT COUNT(student_id) AS couser_member_num, course_id
          FROM COURSE_MEMBER
          GROUP BY course_id
        ) AS COURSE_MEMBER_COUNT
        ON COURSE_MEMBER_COUNT.course_id = CHECKIN_COURSE.course_id)
      WHERE CHECKIN_COURSE.course_id = ?
    ORDER BY date_time DESC;`,
    [course_id],
    `get all checkin history by course_id ${course_id}`);
}

/**
 * 选择某一条签到记录查看已签到学生列表【student_id, student_name】
 * 
 * @export
 * @param {any} checkin_id 
 * @returns 
 */
export async function getAllCourseCheckinStudent(checkin_id) {
  return await execAsync(
    `SELECT CHECKIN_STUDENT.student_id, student_name
      FROM
        CHECKIN_STUDENT
      LEFT JOIN STUDENT
        ON STUDENT.student_id = CHECKIN_STUDENT.student_id
      WHERE checkin_id = ?
    ORDER BY CHECKIN_STUDENT.student_id`,
    [checkin_id],
    `get a checkin history by checkin_id ${checkin_id}`
  );
}

/**
 * 选择某一条签到记录查看未签到学生列表【student_id, student_name】
 * 
 * @export
 * @param {any} checkin_id 
 * @returns 
 */
export async function getAllCourseUncheckinStudent(checkin_id) {
  // 先选择签到对应的全班 not in 选择已签到的人
  return await execAsync(
    `SELECT student_id, student_name
      FROM
        (SELECT STUDENT.student_id, student_name
          FROM STUDENT
        LEFT JOIN COURSE_MEMBER
          ON STUDENT.student_id = COURSE_MEMBER.student_id
        LEFT JOIN CHECKIN_COURSE
          ON COURSE_MEMBER.course_id = CHECKIN_COURSE.course_id
        WHERE checkin_id = ?
        ) AS ALL_STUDENT
      WHERE student_id NOT IN (
        SELECT CHECKIN_STUDENT.student_id
          FROM
            CHECKIN_STUDENT
          LEFT JOIN STUDENT
            ON STUDENT.student_id = CHECKIN_STUDENT.student_id
          WHERE checkin_id = ?
        ORDER BY CHECKIN_STUDENT.student_id)
  ORDER BY student_id`,
  [checkin_id, checkin_id],
  `get a uncheckin history by checkin_id ${checkin_id}`
  );
}

// 查看某学生是否属于该签到课程
export async function checkIfStudentInCheckinCourse(student_id, student_name, checkin_id) {
  return await execAsync(
    `SELECT STUDENT.student_id, student_name
      FROM
        STUDENT
      LEFT JOIN COURSE_MEMBER
        ON COURSE_MEMBER.student_id = STUDENT.student_id
      LEFT JOIN COURSE
        ON COURSE_MEMBER.course_id = COURSE.course_id
      LEFT JOIN CHECKIN_COURSE
        ON CHECKIN_COURSE.course_id = COURSE.course_id
    WHERE checkin_id = ? AND STUDENT.student_id = ? AND student_name = ?`,
    [checkin_id, student_id, student_name],
    `check if student ${student_id} ${student_name} in checkin-course ${checkin_id}`
  );
}

// 查看某次签到的签到人数
export async function getStudentNumInCheckinStudent(checkin_id) {
  return await execAsync(
    `SELECT COALESCE(checkedin_num, 0) AS checkedin_num
      FROM
        (SELECT COUNT(student_id) AS checkedin_num, checkin_id
          FROM
            CHECKIN_STUDENT
        GROUP BY checkin_id) AS CHECKIN_NUM
    WHERE checkin_id = ?`,
    [checkin_id],
    `get number of checkined student by checkin_id ${checkin_id}`
  );
}

// 查看根据学号和签到id找到签到记录
export async function getOneStudentCheckin(student_id, checkin_id) {
  return await execAsync(
    'SELECT * FROM CHECKIN_STUDENT WHERE student_id = ? AND checkin_id = ?',
    [student_id, checkin_id],
    `get checkin reccord by student_id ${student_id} and checkin_id ${checkin_id}`
  );
}
