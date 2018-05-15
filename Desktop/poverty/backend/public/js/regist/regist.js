var input = document.querySelectorAll('.regist-input');
var btn = document.querySelector('.regist-btn');
var tip = document.querySelectorAll('.regist-tip');
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
    if(!input[2].value) {
        tip[2].innerHTML = '密码不能为空';
        return 
    } else {
        tip[2].innerHTML = '';
    }
    if(input[1].value != input[2].value) {
        tip[2].innerHTML = '两次密码不一致';
    }
    var data = {
        username:input[0].value,
        password:input[1].value
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/regist');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status==200){
            if(xhr.responseText == "用户名已存在") {
                tip[0].innerHTML = "用户名已存在";
                input[1].value = '';
                input[2].value = '';
            } else {
                input[0].value = '';
                input[1].value = '';
                input[2].value = '';
                window.location = 'http://localhost:3000/login'
            }
        }
    }


})
