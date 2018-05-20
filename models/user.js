import { execAsync } from './util';

// 教师和管理员信息 工号 姓名 密码 是否为管理员
export async function createUserTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS USER(
      user_id    VARCHAR(50)   PRIMARY KEY NOT NULL,
      username   NVARCHAR(50)  NOT NULL,
      password   VARCHAR(100)   NOT NULL,
      is_manager TINYINT(1)	   DEFAULT 0 NOT NULL
    )`,
    undefined,
    'create USER');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE USER', undefined, 'drop table USER');
}

// 登录
export async function getUserByUserId(user_id, password) {
  return await execAsync(`SELECT user_id, username, is_manager, password FROM USER
    WHERE user_id = ? AND password = ?`,
    [user_id, password],
    `select user by user_id ${user_id} and password ${password}`);
}

// 老师修改密码
export async function changePassword(new_password, user_id, password) {
  return await execAsync('UPDATE USER SET password = ? WHERE user_id = ? AND password = ? AND is_manager = 0',
    [new_password, user_id, password],
    `update user password by user_id: ${user_id} and password ${password}`);
}

// 查看某教师下的所有课程列表
export async function getAllCoursesByUserID(user_id) {
  return await execAsync('SELECT course_id, course_name, semester FROM COURSE WHERE user_id = ?',
    [user_id],
    `select all courses by user_id ${user_id}`);
}

// 管理员的权限 ----------------------------

// 获取所有老师列表
export async function getAllUsersList() {
  return await execAsync(`SELECT user_id, username FROM USER WHERE is_manager = 0`,
    undefined,
    `select all users`);
}

// 根据id查找某个老师姓名
export async function getUsernameByUserID(user_id) {
  return await execAsync(`SELECT username, is_manager FROM USER WHERE user_id = ?`,
    [user_id],
    `select user ${user_id}`);
}

// 创建某个老师
export async function createUser(user) {
  return await execAsync(`INSERT INTO USER (user_id, username, password) VALUES (?, ?, ?)`,
    [user.user_id, user.username, user.password],
    'create user ' + JSON.stringify(user));
}

// 删除某个老师
export async function deleteUser(user_id) {
  return await execAsync('DELETE FROM USER WHERE user_id = ? AND is_manager = 0',
    [user_id],
    `delete user [user_id: ${user_id}]`);
}

// 删除所有老师
export async function deleteAllUsers() {
  return await execAsync('DELETE FROM USER WHERE is_manager = 0',
    undefined,
    'delete all user');
}
