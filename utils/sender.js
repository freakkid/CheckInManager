const fs = require('fs');
const Vue = require('vue');
const render = require('vue-server-renderer');
// 发送网页（完成了sengpage)
export function sendPage(ctx, status = 200, data, str) {
    //sendData(ctx, status, data);
    //console.log(status);
    //console.log(ctx.request.path);
    //console.log(ctx.request.url);
    //console.log(data);
    //console.log(str);
    
    //教师/管理员登录界面
    if(str === 'login'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/login.html');
        ctx.response.type = 'html';
        //console.log('你在登陆界面');
    };


    //教师主页：教师的课程列表界面
    if(str ==='courseList'){
        //console.log('你在课程列表');
        const courseList_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/courseList_template.html', 'utf-8')
        });
        //console.log(data);
        //console.log(typeof(data));
        const tem = new Vue({
            //el:'#Courses',
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/teacher/courseList_markup.html', 'utf-8')
        });

        courseList_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('courseList html');
        })
    };

    //教师界面：课程详情界面
    if(str==='courseDetail'){
        //console.log('你在课程详情界面');
        const courseDetail_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/courseDetail_template.html', 'utf-8')
        });
        const tem = new Vue({
            data:JSON.parse(data),
            template: fs.readFileSync('./views/html/teacher/courseDetail_markup.html', 'utf-8')
        });

        courseDetail_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('courseDetail html');
        })

    };

    //教师界面：修改密码界面
    if(str==='changePasswordPage'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/teacher/changePasswordPage.html');
        ctx.response.type = 'html';
        //console.log('你在修改密码界面');
    };
    //教师界面：学生名单界面
    if(str ==='studentNameListPage'){
        //console.log('你在studentNameListPage界面');
        const studentNameListPage_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/studentNameListPage_template.html', 'utf-8')
        });
        const tem = new Vue({
            data:JSON.parse(data),
            template: fs.readFileSync('./views/html/teacher/studentNameListPage_markup.html', 'utf-8')
        });

        studentNameListPage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('studentNameListPage html');
        })
    }

    

    //教师界面：历史签到界面
    if(str ==='checkAttendancePage'){
        //console.log('你在checkAttendancePage界面');
        var dt = JSON.parse(data);
        //console.log(dt.checkin_history);
        dt.checkin_history.forEach(function(val, index) {
            //console.log(val.date_time);
            //console.log(val.date_time.replace("T"," ").replace("Z",""));
            val.date_time = val.date_time.replace("T"," ");
            val.date_time = val.date_time.substring(0,val.date_time.indexOf('.'));
        });
        //console.log(dt);
        dt = JSON.stringify(dt);
        const checkAttendancePage_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/checkAttendancePage_template.html', 'utf-8')
        });
        const tem = new Vue({
            data:JSON.parse(dt),
            template: fs.readFileSync('./views/html/teacher/checkAttendancePage_markup.html', 'utf-8')
        });

        checkAttendancePage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('checkAttendancePage html');
        })
    }


    //教师界面：点进某一个签到记录查看详情
    if(str ==='singleAttendancePage'){
        //console.log('你在singleAttendancePage界面');
        const singleAttendancePage_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/singleAttendancePage_template.html', 'utf-8')
        });
        const tem = new Vue({
            data:JSON.parse(data),
            template: fs.readFileSync('./views/html/teacher/singleAttendancePage_markup.html', 'utf-8')
        });

        singleAttendancePage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('singleAttendancePage html');
        })
    }


    //教师界面：获取二维码签到界面
    if(str ==='attendancePage'){
        var dt = JSON.parse(data);
        //console.log(dt);
        //console.log('你在发起签到界面');
        const attendance_renderer = render.createRenderer({
            template: require('fs').readFileSync('./views/html/teacher/attendancePage_template.html', 'utf-8')
        })
        const tem = new Vue({
            data: {
                qrcode_src: dt.checkinURL,
                checkedin: 0
            },
            template: fs.readFileSync('./views/html/teacher/attendancePage_markup.html', 'utf-8')
        })

        attendance_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('attendance html');
        })
        //ctx.response.status = status;
        //ctx.response.type = 'html';
        //ctx.response.body = fs.createReadStream('./views/html/teacher/attendancePage.html');
    }

    
    //管理员主页：管理教师界面
    if(str === 'teacherManage'){
        //console.log('你在教师列表界面');
        const teacherManage_renderer = render.createRenderer({
            template: require('fs').readFileSync('./views/html/manager/teacherManage_template.html', 'utf-8')
        })
        const tem = new Vue({
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/manager/teacherManage_markup.html', 'utf-8')
        })

        teacherManage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('teacher manage html');

        })

    }


    //管理员界面：课程管理界面
    if(str === 'courseManage'){
        //console.log('你在课程管理界面');
        const courseManage_renderer = render.createRenderer({
            template: require('fs').readFileSync('./views/html/manager/courseManage_template.html', 'utf-8')
        })
        const tem = new Vue({
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/manager/courseManage_markup.html', 'utf-8')
        })

        courseManage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('courseManage html');

        })

    }

    //管理员界面：某门课的学生管理界面
    if(str === 'studentManage'){
        //console.log('你在学生管理界面');
        const studentManage_renderer = render.createRenderer({
            template: require('fs').readFileSync('./views/html/manager/studentManage_template.html', 'utf-8')
        })
        const tem = new Vue({
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/manager/studentManage_markup.html', 'utf-8')
        })

        studentManage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                //console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            //console.log('studentManage html');

        })


    };



    //管理员界面：添加教师页面
    if(str==='addTeacherPage'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addTeacherPage.html');
        ctx.response.type = 'html';
        //console.log('你在添加教师界面');
    };


    //管理员界面：添加全级学生页面
    if( str==='addAllStudentPage' ){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addAllStudentPage.html');
        ctx.response.type = 'html';
        //console.log('你在添加全级学生界面');
    };

    //管理员界面：添加课程页面
    if( str==='addCoursePage' ){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addCoursePage.html');
        ctx.response.type = 'html';
        //console.log('你在添加课程界面');
    };

    //管理员界面：添加学生页面
    if( str==='addStudentPage' ){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addStudentPage.html');
        ctx.response.type = 'html';
        //console.log('你在添加学生界面');
    };

    //学生扫码签到界面
    if(str ==='student_checkin'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/student/student_checkin.html');
        ctx.response.type = 'html';
        //console.log('你在学生扫码签到界面');
    }
    



}

// TODO 仅发送数据
export function sendData(ctx, status = 200, data, type = 'application/json') {
  //console.log('什么情况啊');
  ctx.response.status = status;
  ctx.response.body = data;
  ctx.response.type = type;
  //console.log(ctx.response.status);
}
