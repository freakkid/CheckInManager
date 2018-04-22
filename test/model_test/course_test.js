import { courseModel } from '../../models';
import assert from 'assert';

export var courses = [
    {
      course_name: '软件测试', user_id: '12454561', credit: 2, semester: '2017-2018学年度第二学期', class_time: '周二5-6节', position: '公教楼b401'
    },
    {
      course_name: '服务计算', user_id: '12453561', credit: 2, semester: '2017-2018学年度第一学期', class_time: '周三3-4节', position: '实验中心b401'
    },
    {
      course_name: '工作流', user_id: '32453561', credit: 2, semester: '2017-2018学年度第二学期', class_time: '周二7-8节', position: '公教楼c201'
    },
    {
      course_name: '系统设计与分析', user_id: '12450561', credit: 2, semester: '2017-2018学年度第二学期', class_time: '周一3-4节', position: '公教楼d202'
    },
    {
      course_name: '现操', user_id: '12459961', credit: 2, semester: '2016-2017学年度第二学期', class_time: '周四2-4节', position: '实验中心b203'
    },
    {
      course_name: '机器人导论', user_id: '33453561', credit: 2, semester: '2017-2018学年度第一学期', class_time: '周五3-4节', position: '实验楼b301'
    },
    {
      course_name: 'web2.0程序设计', user_id: '42453561', credit: 2, semester: '2016-2017学年度第一学期', class_time: '周一7-8节', position: '实验中心b202'
    },
    {
      course_name: '分布式计算', user_id: '12473561', credit: 2, semester: '2017-2018学年度第二学期', class_time: '周五3-4节', position: '实验中心d503'
    },
    {
      course_name: '信息安全导论', user_id: '12454561', credit: 2, semester: '2017-2018学年度第一学期', class_time: '周四3-4节', position: '公教楼c503'
    }
  ];

export async function courseModelTest() {

  for (let course of courses) {
    assert.deepEqual((await courseModel.createCourse(course)).affectedRows, 1);
  }

  assert.deepEqual((await courseModel.getAllCoursesList(courses[0].user_id)).length, 2);
  for (let i = 1; i < courses.length - 1; i++) {
    assert.deepEqual((await courseModel.getAllCoursesList(courses[i].user_id)).length, 1);
  }
  assert.deepEqual((await courseModel.getAllCoursesList(courses[courses.length - 1].user_id)).length, 2);

  // assert.deepEqual((await courseModel.deleteAllCourses(courses[0].user_id)).affectedRows, 2);
  // for (let i = 1; i < courses.length - 1; i++) {
  //   assert.deepEqual((await courseModel.deleteAllCourses(courses[i].user_id)).affectedRows, 1);
  // }
  // assert.deepEqual((await courseModel.deleteAllCourses(courses[courses.length - 1].user_id)).affectedRows, 0);

  // for (let course of courses) {
  //   assert.deepEqual((await courseModel.createCourse(course)).affectedRows, 1);
  // }
  // for (let i = 0; i < courses.length; i++) {
  //   console.log(i);
  //   console.log(courses[i]);
  // }
  for (let i = 0; i < courses.length; i++) {
    assert.deepEqual((await courseModel.getCourseByCourseID(i+1))[0].course_name, courses[i].course_name);
    assert.deepEqual((await courseModel.getUserIDByCourseID(i+1))[0].user_id, courses[i].user_id);
  }

  // for (let i = 0; i < courses.length; i++) {
  //   assert.deepEqual((await courseModel.deleteCourse(i+1)).affectedRows, 1);
  // }

}
