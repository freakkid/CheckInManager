/*var checkinHistory = new Vue({
    el:'#checkinHistory',
    data:{
         checkin_history:[
            
        ]
    },
    methods:{
        to_mainPage:function(course_id) {
            window.location='/course/'+course_id; 
        },
        to_studentList:function(course_id){
            window.location =  '/course/'+course_id+'/course_member';
        },
        to_attendencePage:function(course_id){
            window.location =  '/course/'+course_id+'/checkin_student';

        },
        to_checkAttendencn:function(){
            //要获取gps信息，要实现根据后端的url找到图片匹配到视图

        },
        to_courselist:function(){
             window.location = '/course';

        },
        to_singleAttendancePage:function(course_id,checkin_id){
            window.location = '/course/'+ course_id + '/checkin_student/' + checkin_id;
        },
        setting:function(){
            window.location =  '/user/change_password';
        },
        logout:function(){

        }
        

    },
    created(){

    }

});*/

//下面是jquery方法的实现




function addEvents() {

    //注意：这个界面是需要课程详情界面的course_id，无论是回传还是后面界面都要继续用，还没解决
    var course_id = localStorage.getItem("course_id");


    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;

    $("#mainPage").click(function() {
        window.location='/course/'+course_id;  //要回到课程详情界面就要course_id
    });
    $("#studentName").click(function() {
        window.location =  '/course/'+course_id+'/course_member';//也要course_id
    });
    $("#signHistory").click(function() {
        //不用操作 
    });
    $("#Sign").click(function() {
        //签到界面
        //todo
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

    //点击进入详情签到界面
    $(".checkSingle").click(function() {
        window.location =  '/course/'+ course_id +'/checkin_student/' + $(this).children().text();
        localStorage.setItem("checkin_id",$(this).children().text());
    });

}

$(document).ready(addEvents);