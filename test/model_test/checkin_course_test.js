import assert from 'assert';
import crypto from 'crypto';

import { checkinCourseModel } from '../../models';
// import { generateCheckinID } from '../../services/';
import { courses } from './course_test';

function generateCheckinID(course_id) {
  return crypto.createHmac('sha1', Date.now().toString())
    .update(course_id + 'ugnamsung 15331117' + new Date())
    .digest('hex');
}

export var checkinIDs = new Array(courses.length).fill().map((_, i) => generateCheckinID(i + 1));

export async function checkinCourseModelTest() {
  for (let i = 0; i < courses.length; i++) {
    assert.deepEqual((await checkinCourseModel.createCheckinCourse(i + 1, checkinIDs[i])).affectedRows, 1);
  }

}
