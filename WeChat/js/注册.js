var xhr = document.querySelector(".post");
var username = document.querySelector(".username");
var password = document.querySelector(".password");
var nickname = document.querySelector(".nickname");

xhr.onclick = function () {
    var data = {
        username: username.value,
        password: password.value,
        nickname: nickname.value
    }
    var reg = /^([a-zA-Z]{1})([a-zA-Z0-9]{5,})/g
    if (data.username == '' || data.password == '' || data.nickname == '') {
        alert('请输入注册信息哦！')
        return;
    } else if (!(reg.test(data.username))) {
        alert('用户名格式有误，必须字母开头且不少于六位！')
        return;
    } else if (data.password.length < 6) {
        alert('密码长度不少于六位')
        return;
    } else if (data.nickname.length > 20) {
        alert('昵称不长于二十字')
        return;
    }
    $.ajax({
        type: "post",
        url: "http://118.24.25.7/chat_api/interface/reg.php",
        data: data,
        success: function (res) {
            if (res.code == 0) {
                alert("注册成功")
                location.href = "登录.html"
            }else{
                alert('注册错误')
                console.log(res.msg)
            }
        }
    });
}