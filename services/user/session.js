import crypto from 'crypto';
import * as redisService from '../redis';

// session_id --- user_id
function generateSessionID(user_id) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(user_id + '15331117 ugnamsung' + new Date())
    .digest('hex');
}

export async function addSessionID(user_id) {
  let session_id = generateSessionID(user_id);
  while (await redisService.get(session_id)) {
    session_id = generateSessionID(user_id);
  }
  await redisService.set(session_id, user_id);
  return session_id;
}

export async function getUserID(session_id) {
  return await redisService.get(session_id);
}

export async function deleteSessionID(session_id) {
  return (await redisService.del(session_id)) === 1;
}
