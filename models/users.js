import { execAsync } from './util';

export async function createUserTable() {
  // is_manager  是否为管理员
  // identity    用户身份 'student/teacher'
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS users (
    user_id     VARCHAR(12) PRIMARY KEY,
    username    NVARCHAR(24) NOT NULL,
    password    VARCHAR(16) NOT NULL,
    is_manager  BOOL DEFAULT false NOT NULL,
    identity    VARCHAR(10) NOT NULL,
    )`,
    undefined,
    'Table users created...');
}

export async function dropUserTable() {
  return await execAsync('DROP TABLE users', undefined, 'drop table users');
}

export async function createUser(user) {
  return await execAsync(`INSERT INTO users
  (user_id, username, password, identity) VALUES (?, ?, ?, ?)`,
    [user.user_id, user.username, user.password, user.identity],
    'create user ' + JSON.stringify(user));
}

// for login by user_id
export async function getUserByUserId(user_id, password) {
  return await execAsync(`SELECT user_id, username, is_manager, identity FROM users
  WHERE user_id = ? AND password = ?`,
    [user_id, password],
    `select user by user_id ${user_id} and password`);
}


export async function getUsernameByUserID(user_id) {
  return await execAsync('SELECT username FROM users WHERE user_id = ?',
    [user_id],
    `select user by user_id ${user_id}`);
}

export async function changePassword(new_password, user_id, password) {
  return await execAsync('UPDATE users SET password = ? WHERE user_id = ? AND password = ?',
    [new_password, user_id, password],
    `update user [user_id: ${user_id}, password: ${password}]`);
}

export async function deleteUser(user_id, password) {
  return await execAsync('DELETE FROM users WHERE user_id = ? AND password = ?',
    [user_id, password],
    `delete user [user_id: ${user_id}]`);
}