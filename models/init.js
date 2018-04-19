import process from 'process';
import { createUserTable, dropUserTable } from './users';
import { createBlogTable, dropBlogTable } from './blogs';

export async function initDatabase() {
  try {
    await createUserTable();
    await createStudentTable();
    await createCourseTable();
    await createCheckinStudentTable();
    await createCourseMemberTable();
    await createCheckinCourseTable();
  } catch (err) {
    process.exit(1);
  }
}

export async function initDatabaseForTest() {
  try {
    //? just for test
    await dropUserTable();
    await dropBlogTable();
    await dropCommentTable();
    //?-------------------
    await initDatabase();
  } catch (err) {
    process.exit(1);
  }
}




