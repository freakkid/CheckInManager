/*var coursedetail = new Vue({
    el:'#CourseDetail',
    data:{
        course_name: '',
        course_id: '1',
        credit: 2,
        semester: '2017-2018学年度第一学期',
        class_time: '周二1-4节课', 
        position: '公教楼b栋', 
        student_num: 100,
        username:'pml'
    },
    methods:{
        to_mainPage:function() {
            //还是返回到当前页面
        },
        to_studentList:function(course_id){
            window.location =  '/course/'+this.course_id+'/course_member'; 
        },
        to_attendencePage:function(course_id){
            window.location =  '/course/'+this.course_id+'/checkin_student';

        },
        to_checkAttendencn:function(){
            //要获取gps信息，要实现根据后端的url找到图片匹配到视图

        },
        to_courselist:function(){
              window.location = "/course";

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

//上面的Vue实例，目前没有作用
//改用下面的JQuery对象






function addEvents() {

    

   // localStorage.setItem("course_id",course_id);//这个界面获得course id，写进浏览器内存
    var course_id = localStorage.getItem("course_id"); 
    //console.log($("#courseId").text());//这个界面，测试服务器返回的课程id假定是1，


    $("#mainPage").click(function() {
        //   window.location='/course/'+$(this).children().text(); 
        //还是返回本界面
        //alert(a);
    });
    $("#studentName").click(function() {
        window.location =  '/course/'+course_id+'/course_member'; 
    });
    $("#signHistory").click(function() {
        window.location =  '/course/'+course_id+'/checkin_student';
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
}

$(document).ready(addEvents);