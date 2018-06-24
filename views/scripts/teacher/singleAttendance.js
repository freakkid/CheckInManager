var singleAttendance = new Vue({
    el:'#singleAttendance',
    data:{
        checkedin:[
        /*{
            student_id:'15331689',
            student_name:'王同学'
        },
        {
            student_id:'15457682',
            student_name:'李同学'
        }*/
        ],
        checkedin_num:0,
        uncheckedin:[
        /*{
            student_id:"15331689",
            student_name:"王同学"
        },
        {
            student_id:"15457682",
            student_name:"李同学"
        }*/
        ],
        uncheckedin_num:0,
    }
});

//下面是jquery方法的实现



function addEvents() {

    //注意：这个界面是需要课程详情界面的course_id，无论是回传还是后面界面都要继续用，还没解决
    var course_id = localStorage.getItem("course_id");

    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;


    $("#mainPage").click(function() {
        window.location='/course/'+course_id;  //要回到课程详情界面就要course_id
    });
    $("#studentName").click(function() {
       window.location =  '/course/'+course_id+'/course_member';
    });
    $("#signHistory").click(function() {
        window.location =  '/course/'+course_id+'/checkin_student'; //也要course_id
    });
    $("#Sign").click(function() {
 
        window.location = '/course/'+course_id+'/checkin_course';
    });
    $("#courseList").click(function() {
        window.location = "/course";
    });
    $("#changePass").click(function() {
        window.location =  '/user/change_password';
    });
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
}

$(document).ready(addEvents);