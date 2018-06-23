var loginform = new Vue({
    el: '#bodyBottom',
    data: {
        em1: '',
        em2: '',
        name: '',
        pw: '',
        username:''
    },
    methods: {
        checkInput: function() {
            var p=0;
            if (loginform.name === '') {
                p++;
                loginform.em1 = '用户名不能为空';
            };
            if (loginform.pw === '') {
                p++;
                loginform.em2 = '密码不能为空';
            } else {
                loginform.em2 = '';
            };
            if (!!loginform.name && /^[\d]{8}$/.test(loginform.name) === false) {
                p++;
                loginform.em1 = '用户名格式错误,正确格式:8位数字';
            };
            if (p>0) {
                return false;
            };
            //console.log('post'); 
            let that = this;
        
            axios.post('/api/users/session', {
                'user_id': loginform.name,
                'password': loginform.pw
            })
            .then(function (response) {
                //console.log(response);

                if (response.status == 201) {
                    //console.log(response.data);
                    that.username = response.data.username; //然后要将这个名字保存下来以后用
                    //console.log(that.username);
                    //alert(that.username);
                    var global_name = that.username;
                    localStorage.setItem("username",global_name);
                    //console.log(localStorage.getItem("username"));

                    //怎么判断登录用户是管理员还是教师？再选择要跳转界面
                    window.location='/user/login';
                    //window.location="/course"; //定义到教师界面的url
                    //window.location="/user"; //定向到管理员界面的url
                }
            })
            .catch(function (error) {
                //alert(error.status);
                alert(error.response.data.message);
                alert('登录失败');
            });
        }
    },
    created(){
      //alert('mdzz');
    }
});

