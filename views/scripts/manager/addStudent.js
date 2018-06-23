//需要user_id传递给后面
var user_id = localStorage.getItem("user_id");
//需要course_id
var course_id = localStorage.getItem("course_id");
// 欢迎信息显示
//$("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！');
// 欢迎信息显示
$(document).ready(function() {
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！');
});

var addstudentform = new Vue({
    el: '#addStudent',
    data: {
        em1: '',
        em2: '',
        username: '',
        user_id: ''
    },
    methods: {
        checkInput: function() {
            
            //p>0时为出错
            //前端需要检查做输入是否为空
            var p = 0;
            if (addstudentform.username === '') {
                p++;
                addstudentform.em1 = '姓名不能为空';
            } else {
                addstudentform.em1 = '';
            };
            if (addstudentform.user_id === '') {
                p++;
                addstudentform.em2 = '学号不能为空';
            } else {
                addstudentform.em2 = '';
            };
            if (!!addstudentform.user_id && /^[\d]{8}$/.test(addstudentform.user_id) === false) {
                p++;
                addstudentform.em2 = '学号格式错误,正确格式:8位数字';
            };
            if (p>0) {
                return false;
            };

            //console.log('post');
            //add_course_student_url = '/api/course/'+course_id+'/course_member';
            //console.log('name,id:',addstudentform.username,addstudentform.user_id);
            axios.post('/api/course/'+course_id+'/course_member', {
                student_id : addstudentform.user_id,
                student_name : addstudentform.username
            })
            .then(function (response) {
                //console.log(response.status);
                if (response.status == 201) {
                    window.location='/user/'+user_id+'/course/'+course_id+'/course_member';

                }
            })
            .catch(function (error) {
                
                //console.log(error.response.status);
                alert(error.response.data.message);
            });
        },
        back:function () {
            var user_id = localStorage.getItem("user_id");
            var course_id = localStorage.getItem("course_id");
            window.location= '/user/' + user_id + '/course/' + course_id + '/course_member';
        },
        to_addStudentPage:function(course_id){
            window.location = '/add_student'; 
        },

        quitLogin: function() {
            //console.log('cookie',document.cookie);
            axios.delete('/api/users/session')
            .then(function (response) {
                //console.log(response.status);
                window.location="/user/login";
            })
            .catch(function (error) {
                alert(error.response.data.message);
                //console.log(error);
                alert('添加失败');
            });
        }
    }
});