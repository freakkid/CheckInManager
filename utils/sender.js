const fs = require('fs');
const Vue = require('vue');
const render = require('vue-server-renderer');
// TODO 发送网页
export function sendPage(ctx, status = 200, data) {
    //sendData(ctx, status, data);
    console.log('login');
    console.log(status);
    console.log(ctx.request.path);
    console.log(ctx.request.url);
    
    if(ctx.request.path ==='/user/login'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/login.html');
        ctx.response.type = 'html';
        console.log('你在登陆界面');
    };

    if(ctx.request.path == '/user/change_password'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/teacher/changePasswordPage.html');
        ctx.response.type = 'html';
        console.log('你在修改密码界面');
    };




    
    //这个暂时有问题
    if(ctx.request.path == '/add_student'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addAllStudentPage.html');
        ctx.response.type = 'html';
        console.log('你在添加全级学生界面');
    };

    if(ctx.request.path == '/user/add_user'){
        ctx.response.status = status;
        ctx.response.body = fs.createReadStream('./views/html/manager/addTeacherPage.html');
        ctx.response.type = 'html';
        console.log('你在添加教师界面');
    };

    if(ctx.request.path ==='/course'){
        console.log('你在课程列表');
        const courseList_renderer = render.createRenderer({
            template: fs.readFileSync('./views/html/teacher/courseList_template.html', 'utf-8')
        });
        console.log(data);
        console.log(typeof(data));
        const tem = new Vue({
            //el:'#Courses',
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/teacher/courseList_markup.html', 'utf-8')
        });

        courseList_renderer.renderToString(tem, (err, html) => {
            if (err) {
                console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            console.log('courseList html');
        })
    };

    if(ctx.request.path =='/user'){
        console.log('你在教师列表界面');
        const teacherManage_renderer = render.createRenderer({
            template: require('fs').readFileSync('./views/html/manager/teacherManage_template.html', 'utf-8')
        })
        const tem = new Vue({
            data: JSON.parse(data),
            template: fs.readFileSync('./views/html/manager/teacherManage_markup.html', 'utf-8')
        })

        teacherManage_renderer.renderToString(tem, (err, html) => {
            if (err) {
                console.log(err);
                ctx.response.status = 500;
                ctx.response.body = 'Internal Server Error';
                return;
            }
            ctx.response.body = html;
            console.log('teacher manage html');
            //console.log(html);

        })

    }
}

// TODO 仅发送数据
export function sendData(ctx, status = 200, data, type = 'application/json') {
    console.log('什么情况啊');
  ctx.response.status = status;
  ctx.response.body = data;
  ctx.response.type = type;
  // console.log(ctx.response.status);
}
