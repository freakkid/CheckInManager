//获取GPS位置
if(navigator.geolocation){  
     // getCurrentPosition支持三个参数  
     // getSuccess是执行成功的回调函数  
     // getError是失败的回调函数  
     // getOptions是一个对象，用于设置getCurrentPosition的参数  
     // 后两个不是必要参数  
    // alert('支持获取gps');//判断浏览器是否支持geolocation  
     var getOptions = {  
          //是否使用高精度设备，如GPS。默认是true  
          enableHighAccuracy:true,  
          //超时时间，单位毫秒，默认为0  
          timeout:5000,  
          //使用设置时间内的缓存数据，单位毫秒  
          //默认为0，即始终请求新数据  
          //如设为Infinity，则始终使用缓存数据  
          maximumAge:0  
     };  
   
     //成功回调  
     function getSuccess(position){  
          // getCurrentPosition执行成功后，会把getSuccess传一个position对象  
          // position有两个属性，coords和timeStamp  
          // coords是一个对象，包含了地理位置数据  
          console.log("时间："+ position.timeStamp);    // timeStamp表示地理数据创建的时间？？？？？？  
          console.log("纬度："+position.coords.latitude);  // 估算的纬度       
          console.log("经度："+position.coords.longitude);   // 估算的经度           
          console.log("海拔："+position.coords.altitude);   // 估算的高度 (以米为单位的海拔值)           
          console.log("经纬度估算精度："+position.coords.accuracy);   // 所得经度和纬度的估算精度，以米为单位    
          console.log("高度估算精度："+position.coords.altitudeAccuracy);   // 所得高度的估算精度，以米为单位    
          console.log("设备移动方向："+position.coords.heading);  // 宿主设备的当前移动方向，以度为单位，相对于正北方向顺时针方向计算       
          console.log("设备移动速度："+position.coords.speed); // 设备的当前对地速度，以米/秒为单位
          console.log("纬度的数据类型是："+typeof(position.coords.latitude)) ;     
          
          
          if(position.address){  // Firefox 还提供了另外一个属性address  
               //通过address，可以获得国家、省份、城市  
               console.log("国家："+position.address.country);  
               console.log("省份："+position.address.province);  
               console.log("城市："+position.address.city);  
          }  
     }  
     //失败回调  
     function getError(error){  
          // 执行失败的回调函数，会接受一个error对象作为参数  
          // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE  
          // 执行失败时，code属性会指向三个常量中的一个，从而指明错误原因  
          switch(error.code){  
               case error.TIMEOUT:  
                    //console.log('超时');  
                    break;  
               case error.PERMISSION_DENIED:  
                    //console.log('用户拒绝提供地理位置');  
                    break;  
               case error.POSITION_UNAVAILABLE:  
                    //console.log('地理位置不可用');  
                    break;  
               default:  
                    break;  
        }  
    } 
     navigator.geolocation.getCurrentPosition(getSuccess, getError, getOptions);  
     // watchPosition方法一样可以设置三个参数  
     // 使用方法和getCurrentPosition方法一致，只是执行效果不同。  
     // getCurrentPosition只执行一次  
     // watchPosition只要设备位置发生变化，就会执行  
     var watcher_id = navigator.geolocation.watchPosition(getSuccess, getError, getOptions);  
     //clearwatch用于终止watchPosition方法  
     navigator.geolocation.clearWatch(watcher_id);           
}  

   //用sohu的API获取本机网络ip地址
   console.log("用sohu的api获取到的Ip地址："+returnCitySN.cip);  
   console.log("IP地址的数据类型为："+typeof(returnCitySN.cip));


function get_checkin_num() {
    //console.log('/api/checkin_student/'+localStorage.getItem("checkin_id"));
    axios.get('/api/checkin_student/'+localStorage.getItem("checkin_id"))
    .then(function(response) {
        //console.log(response.data.checkined);
        //alert(response.data.checkined);
        $("#attendanceNumber").text(response.data.checkined);
    })
    .catch(function(error) {
        //console.log(error);
    })
}

$(document).ready(function() {
    var course_id = localStorage.getItem("course_id");
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！');

    $("#QRCodePic").attr("src",
    'http://qr.liantu.com/api.php?text=' + 'http://' + $("#QRCodePic").attr("src"));
    //alert($("#QRCodePic").attr("src"));
    var qr_src = $("#QRCodePic").attr("src");
    var pos = qr_src.indexOf("checkinByQRCode");

    localStorage.setItem("checkin_id",qr_src.substring(pos + 16, qr_src.length));

    window.setInterval("get_checkin_num()",1000);

     $("#mainPage").click(function() {
         window.location='/course/'+course_id; 
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
        //本界面，不操作
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
    $("#stopBT").click(function(){
        checkin_id = localStorage.getItem("checkin_id");
        axios.delete('/api/checkin_student/'+checkin_id)
        .then(function (response) {
            //console.log(response.status);
            course_id = localStorage.getItem("course_id");
            window.location =  '/course/'+course_id+'/checkin_student';

        })
        .catch(function (error) {
            alert(error.response.data.message);
        });
    })


});