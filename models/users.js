import { execAsync } from './util';

// 教师和管理员信息 工号 姓名 密码 是否为管理员
export async function createUserTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS USER(
      user_id    VARCHAR(50)   PRIMARY KEY NOT NULL,
      user_name  NVARCHAR(50)  NOT NULL,
      password   VARCHAR(50)   NOT NULL,
      is_manager TINYINT(1)	   DEFAULT 0 NOT NULL
    )`,
    undefined,
    'Created USER Table');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE USER', undefined, 'drop table USER');
}

export async function createUser(user) {
  return await execAsync(`INSERT INTO USER
  (user_id, username, password) VALUES (?, ?, ?)`,
    [user.user_id, user.username, user.password],
    'create user ' + JSON.stringify(user));
}

export async function getUserByUserId(user_id, password) {
  return await execAsync(`SELECT user_id, username, is_manager FROM USER
  WHERE user_id = ? AND password = ?`,
    [user_id, password],
    `select user by user_id ${user_id} and password`);
}

// export async function getUsernameByUserID(user_id) {
//   return await execAsync('SELECT username FROM USER WHERE user_id = ?',
//     [user_id],
//     `select user by user_id ${user_id}`);
// }

export async function changePassword(new_password, user_id, password) {
  return await execAsync('UPDATE USER SET password = ? WHERE user_id = ? AND password = ?',
    [new_password, user_id, password],
    `update user password by user_id: ${user_id} and password`);
}

// 只能删除非管理员的用户
export async function deleteUser(user_id) {
  return await execAsync('DELETE FROM USER WHERE user_id = ? AND is_manager = 0',
    [user_id],
    `delete user [user_id: ${user_id}]`);
}