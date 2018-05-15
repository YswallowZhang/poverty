var input = document.querySelectorAll('.login-input');
var btn = document.querySelector('.login-btn');
var tip = document.querySelectorAll('.login-tip');
btn.addEventListener('click', () => {
    if(!input[0].value) {
        tip[0].innerHTML = '用户名不能为空';
        return 
    } else {
        tip[0].innerHTML = '';
    }
    if(!input[1].value) {
        tip[1].innerHTML = '密码不能为空';
        return 
    } else {
        tip[1].innerHTML = '';
    }
    var data = {
        username:input[0].value,
        password:input[1].value
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/login');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status==200){
            if(xhr.responseText == "用户名不存在") {
                tip[0].innerHTML = "用户名不存在";
                input[1].value = '';
            } else if(xhr.responseText == "在密码错误") {
                tip[1].innerHTML = "密码错误";
            } else{
                window.location = 'http://localhost:3000'
            }
        }
    }


})