import assert from 'assert';
import { courseMemberModel } from '../../models';
import { students } from './student_test';
import { courses } from './course_test';

export async function courseMemberModelTest() {
  for (let i = 1; i <= courses.length; i++) {
    for (let stu of students) {
      assert.deepEqual((await courseMemberModel.insertCourseMember(i, stu.student_id)).affectedRows, 1);
    }
    assert.deepEqual((await courseMemberModel.getCourseMember(i)).length, students.length);
  }

  for (let i = 1; i <= courses.length; i++) {
    assert.deepEqual((await courseMemberModel.deleteCourseMember(i, students[3].student_id)).affectedRows, 1);
    assert.deepEqual((await courseMemberModel.getCourseMember(i)).length, students.length - 1);
  }

  for (let i = 1; i <= courses.length; i++) {
    assert.deepEqual((await courseMemberModel.deleteAllCourseMember(i)).affectedRows, students.length - 1);
    assert.deepEqual((await courseMemberModel.getCourseMember(i)).length, 0);
  }

  for (let i = 1; i < courses.length / 2; i++) {
    for (let stu of students) {
      assert.deepEqual((await courseMemberModel.insertCourseMember(i, stu.student_id)).affectedRows, 1);
    }
    assert.deepEqual((await courseMemberModel.getCourseMember(i)).length, students.length);
  }

  for (let i = Math.ceil(courses.length / 2); i <= courses.length; i++) {
    for (let j = 0; j < students.length / 2; j++) {
      assert.deepEqual((await courseMemberModel.insertCourseMember(i, students[j].student_id)).affectedRows, 1);
    }
    assert.deepEqual((await courseMemberModel.getCourseMember(i)).length, Math.floor(students.length / 2) + 1);
  }
}
