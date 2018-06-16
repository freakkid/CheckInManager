var addTeacherform = new Vue({
    el: '#addTeacher',
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
            if (addTeacherform.username === '') {
                p++;
                addTeacherform.em1 = '姓名不能为空';
            } else {
                addTeacherform.em1 = '';
            };
            if (addTeacherform.user_id === '') {
                p++;
                addTeacherform.em2 = '工号不能为空';
            } else {
                addTeacherform.em2 = '';
            };
            if (!!addTeacherform.user_id && /^[\d]{8}$/.test(addTeacherform.user_id) === false) {
                p++;
                addTeacherform.em2 = '工号格式错误,正确格式:8位数字';
            };
            if (p>0) {
                return false;
            };

            //console.log('post');
            axios.post('/api/user', {
                'username': addTeacherform.username,
                'user_id': addTeacherform.user_id
            })
            .then(function (response) {
                //console.log(response.status);
                if (response.status == 201) {
                    window.location="/user";
                }

            })
            .catch(function (error) {
                //alert(error.status);
                //console.log(error.response.status);
                alert(error.response.data.message);
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
    }
});

// 欢迎信息显示
$(document).ready(function() {
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！');
});