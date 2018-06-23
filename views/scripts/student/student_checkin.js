var student_checkin = new Vue({
    el: '#bodyBlock',
    data: {
        em1: '',
        em2: '',
        student_id: '',
        name: ''
    },
    methods: {
        checkInput: function() {
            var p=0;
            student_checkin.em1 = '';
            student_checkin.em2 = '';
            if (student_checkin.student_id === '') {
                p++;
                student_checkin.em1 = '学号不能为空';
            };
            if (!!student_checkin.student_id && /^[\d]{8}$/.test(student_checkin.student_id) === false) {
                p++;
                student_checkin.em1 = '学号格式错误,正确格式:8位数字';
            };
            if (student_checkin.name === '') {
                p++;
                student_checkin.em2 = '姓名不能为空';
            } else {
                student_checkin.em2 = '';
            };
            if (p>0) {
                return false;
            };
            //console.log('post'); 
            let that = this;
            //var checkin_id = localStorage.getItem("checkin_id");
            //alert(checkin_id);
            var pos = window.location.href.indexOf("checkinByQRCode");
            var checkin_id = window.location.href.substring(pos + 16, window.location.href.length);
            //alert(checkin_id);
            var checkin_url = '/api/checkin_student/'+checkin_id;
            axios.post(checkin_url, {
                student_id: student_checkin.student_id,
                student_name: student_checkin.name
            })
            .then(function(response) {
                alert('签到成功');
                $("#bodyBlock").style.display='null';

            })
            .catch(function(error) {
               
                //更换图片
                alert(error.response.data.message);
            });
        }
    }
});