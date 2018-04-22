import { studentModel } from '../../models';
import assert from 'assert';

export var students = [
  {
    student_id: '15331117', student_name: '黄楠绚'
  },
  {
    student_id: '15431117', student_name: '高恩星'
  },
  {
    student_id: '15431314', student_name: '贾同学'
  },
  {
    student_id: '15431413', student_name: '甄同学'
  },
  {
    student_id: '15431513', student_name: '李同学'
  },
  {
    student_id: '15432513', student_name: '王小明'
  },
  {
    student_id: '15431913', student_name: '高然'
  },
  {
    student_id: '15431503', student_name: '很厉害'
  },
  {
    student_id: '15431553', student_name: '你猜'
  },
  {
    student_id: '15431223', student_name: '我不猜'
  },
  {
    student_id: '15441223', student_name: '假的吧'
  },
  {
    student_id: '15442223', student_name: '真瓜皮'
  },
  {
    student_id: '15442293', student_name: '稳住'
  }
];

export async function studentModelTest() {

  for (let stu of students) {
    assert.deepEqual((await studentModel.createStudent(stu)).affectedRows, 1);
  }

  for (let stu of students) {
    assert.deepEqual((await studentModel.getStudentNameByStudentId(stu.student_id))[0].student_name, stu.student_name);
  }

  assert.deepEqual((await studentModel.deleteAllStudents()).affectedRows, students.length);

  for (let stu of students) {
    assert.deepEqual((await studentModel.createStudent(stu)).affectedRows, 1);
  }

  assert.deepEqual((await studentModel.getAllStudentsList()).length, students.length);

  // for (let stu of students) {
  //   assert.deepEqual((await studentModel.deleteStudentByStudentId(stu.student_id)).affectedRows, 1);
  // }

}
