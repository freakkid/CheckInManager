
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
        user_id: '',
        teacher_name: ''
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

            //console.log('add all students');
            axios.post('/api/student', {
                student_name : addstudentform.username,
                student_id : addstudentform.user_id
            })
            .then(function (response) {
                //console.log(response.status);
                if (response.status == 201) {
                    window.location='/user';
                }
            })
            .catch(function (error) {
                //alert(error.status);
                //console.log(error.response.status);
            });
        },
        back:function () {
             window.location="/user";
        },
        to_addStudentPage:function(course_id){
            window.location =  '/add_student'; 
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
    },
    created() {

    }
});