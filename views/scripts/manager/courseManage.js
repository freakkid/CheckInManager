var courseManage = new Vue({
	el:'#courseManage',
	data:{
		courses:[
      
        ]

	}
});

//以上vue用于测试一下前端渲染
//下面是jquery添加事件

//需要user_id传递给后面
var user_id = localStorage.getItem("user_id");
function addEvents() {
    // 欢迎信息显示
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;
    
	//管理员选择某个课程进入到该课程的学生列表界面
    $(".courseID").click(function() { 
        window.location='/user/'+ user_id +'/course/' + $(this).children().text() + '/course_member'; 
        localStorage.setItem("course_id",$(this).children().text()); //存course_id
         
    });

    // 返回按钮，回退到上个界面
    $("#backButton").click(function() {
        window.location='/user';
    });

    //退出登录
    $("#logout").click(function() {
        //console.log('cookie',document.cookie);
        axios.delete('/api/users/session')
        .then(function (response) {
            //console.log(response.status);
            window.location="/user/login";
        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    });

    //手动添加课程
    $("#addCourse").click(function() {
        window.location = '/user/'+user_id+'/add_course';
    });
    
    // 添加全级学生
    $("#addAllStudentButton").click(function() {
        window.location = '/add_student';
    });

    // 删除某个课程数据
    $(".delete_course").click(function() {
        var course_id = $(this).parent().prev().prev().children().text();
        var coursename = $(this).parent().prev().text();
        var delete_course_url = '/api/course/'+course_id;

        var cn = $.trim(coursename);
        var check = confirm('确认删除课程'+cn+'的信息吗?');
        if (check === true) {
            axios.delete(delete_course_url)
            .then(function(response) {
                //console.log(response.status);
                alert('删除课程数据成功');
                window.location='/user/' + localStorage.getItem("user_id") + '/course'; 
            })
            .catch(function(error) {
                //console.log(error.response);
                alert(error.response.data.message);
                alert('删除课程数据失败');
            });
        }
    });
}

$(document).ready(addEvents);