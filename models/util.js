import mysql from 'mysql';

import { db } from '../config';
import { logger } from '../utils';


export async function createDatabase() {
  return await new Promise(function (resolve, reject) {
    
    const conn = mysql.createConnection({
      host: db.host,
      user: db.user,
      password: db.password,
    });
    conn.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }
      conn.query('CREATE DATABASE IF NOT EXISTS ' + db.database, function (err) {
        if (err) {
          reject(err);
          return;
        }
        conn.end();
        logger.info('Database created...');
        resolve();
      });
    });
  });
}
/**
 * @description 护卫的
 * @param   {string} sqlstatement
 * @param   {object} values
 * @param   {string} message
 *
 * @returns {Promise<any>}
 * 
 */
export async function execAsync(sqlstatement, values, message) {
  return await new Promise(function (resolve, reject) {
    const conn = mysql.createConnection(db);
    conn.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }
      conn.query(sqlstatement, values, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        conn.end();
        logger.info(message);
        resolve(result);
      });
    });
  });
}
