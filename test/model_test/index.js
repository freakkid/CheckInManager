import { initDatabaseForTest } from '../../models';
import { userModelTest } from './user_test';
import { studentModelTest } from './student_test';
import { courseModelTest } from './course_test';
import { courseMemberModelTest } from './course_member_test';
import { checkinCourseModelTest } from './checkin_course_test';
import { checkinStudentModelTest } from './checkin_student_test';
import { logger } from '../../utils';

export async function modelTest() {
  try {
    await initDatabaseForTest();
    await userModelTest();
    await studentModelTest();
    await courseModelTest();
    await courseMemberModelTest();
    await checkinCourseModelTest();
    await checkinStudentModelTest();
    logger.info('Pass all test!');
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

