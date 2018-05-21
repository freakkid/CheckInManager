import redis from 'redis';
import { logger } from '../utils/index';

export const client = redis.createClient();

export async function testRedis() {
  return await new Promise(function (resolve, reject) {
    client.on('error', function (err) {
      if (err) {
        reject('redis error: ' + err);
      } else {
        resolve('connect redis successfully');
      }
    });
  });
}

// default 1h
export async function set(key, value, seconds = 1 * 60 * 60) {
  return await new Promise(function (resolve, reject) {
    client.set(key, value, function (err, reply) {
      if (err) {
        reject(err);
      }
    });
    client.expire(key, seconds);
    resolve(`set ${key} ${value} ${seconds}(s)`);
  });
}

export async function get(key) {
  return await new Promise(function (resolve, reject) {
    client.get(key, function (err, reply) {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
}

export async function del(key) {
  return await new Promise(function (resolve, reject) {
    client.del(key, function (err, reply) {
      if (err) {
        resolve(err);
      }
      if (reply !== 1) {
        resolve('delete ${key} fail');
      }
      resolve(null);
    });
  });
}

// async function test() {
//   try {
//     logger.info('>>??');
//     // logger.info(await testRedis());
//     logger.info(await set('123', '456'));
//     if(!await get('123d')) {
//       console.log('ss');
//     }
//     logger.info(await del('123'));
//     logger.info(await del('123'));
//   } catch (err) {
//     logger.error(err);
//   }
// }
