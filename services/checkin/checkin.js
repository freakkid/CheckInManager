import crypto from 'crypto';

import * as redisService from '../redis';
import { port, hostname } from '../../config';
import { logger } from '../../utils';


function generateCheckinID(course_id) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(course_id + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}

export function generateCheckinURL(checkin_id) {
  return `${hostname}:${port}/checkinByQRCode/${checkin_id}`;
}

// course_id checkin_id 
// checkin_id course_id
export async function set(course_id) {
  var checkin_id = generateCheckinID(course_id);
  while (await redisService.get(checkin_id)) {
    checkin_id = generateCheckinID(course_id);
  }
  // defalut 30min
  await redisService.set(checkin_id, course_id, 1 * 30 * 60);
  await redisService.set(course_id, checkin_id, 1 * 30 * 60);
  return checkin_id;
}

export async function getCourseID(checkin_id) {
  return await redisService.get(checkin_id);
}

export async function getCheckinID(course_id) {
  return await redisService.get(course_id);
}

export async function del(checkin_id, course_id) {
  logger.log(await redisService.del(checkin_id));
  logger.log(await await redisService.del(course_id));
}
