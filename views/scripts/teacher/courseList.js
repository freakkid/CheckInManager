// 这个Vue实例，没有作用
/*var courselist = new Vue({
    el:'#Courses',
    data: {
        courses: ''
    },
    methods:{
    	quitLogin: function() {
            //console.log('cookie',document.cookie);
            axios.delete('/api/users/session')
            .then(function (response) {
                //console.log(response.status);
                window.location="/user/login";
            })
            .catch(function (error) {
                alert(response.data);
            });
        },
        changPassword:function() {
            //console.log('changPassword');
            window.location="/user/change_password";
        },
        jump:function (course_id){
            //console.log('jump');
            window.location='/course/'+course_id; 
            //return course_id;
            //alert('hello,newpage!'); 
        }
    },
    created(){

    }
});*/
//上面的Vue实例，目前没有作用




function addEvents() {


    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;

    $(".name").click(function() {
        
        localStorage.setItem("course_id",$(this).children().text());
        window.location='/course/'+$(this).children().text(); 
    });
    //修改密码
    $("#changePass").click(function() {
        window.location =  '/user/change_password';
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
            //alert(response.data);
            //console.log(error);
            //alert(error);
            alert(error.response.data.message);
        });
    });
 
}

$(document).ready(addEvents);