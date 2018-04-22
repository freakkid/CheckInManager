import assert from 'assert';
import { checkinStudentModel } from '../../models';
import { checkinIDs } from './checkin_course_test';
import { students } from './student_test';
import { courses } from './course_test';

export async function checkinStudentModelTest() {
  for (let i = 1; i < courses.length / 2; i++) {
    for (let stu of students) {
      assert.deepEqual((await checkinStudentModel.checkIfStudentInCheckinCourse(stu.student_id, stu.student_name, checkinIDs[i - 1])).length, 1);
      assert.deepEqual((await checkinStudentModel.createCheckinStudent(stu.student_id, checkinIDs[i - 1])).affectedRows, 1);
    }
    assert.deepEqual((await checkinStudentModel.getAllCourseCheckinStudent(checkinIDs[i - 1])).length, students.length);
    assert.deepEqual((await checkinStudentModel.getAllCourseUncheckinStudent(checkinIDs[i - 1])).length, 0);
  }

  for (let i = Math.ceil(courses.length / 2); i <= courses.length; i++) {
    for (let j = 0; j < students.length / 2 - 1; j++) {
      assert.deepEqual((await checkinStudentModel.checkIfStudentInCheckinCourse(students[j].student_id, students[j].student_name, checkinIDs[i - 1])).length, 1);
      assert.deepEqual((await checkinStudentModel.createCheckinStudent(students[j].student_id, checkinIDs[i - 1])).affectedRows, 1);
    }
    for (let j = Math.ceil(students.length / 2); j < students.length; j++) {
      assert.deepEqual((await checkinStudentModel.checkIfStudentInCheckinCourse(students[j].student_id, students[j].student_name, checkinIDs[i - 1])).length, 0);
    }
    assert.deepEqual((await checkinStudentModel.getAllCourseCheckinStudent(checkinIDs[i - 1])).length, Math.floor(students.length / 2)); // + 1 - 1
    assert.deepEqual((await checkinStudentModel.getAllCourseUncheckinStudent(checkinIDs[i - 1])).length, 1);
  }

  for (let i = 1; i <= courses.length; i++) {
    assert.deepEqual((await checkinStudentModel.getAllCourseCheckin(i)).length, 1);
  }
}
