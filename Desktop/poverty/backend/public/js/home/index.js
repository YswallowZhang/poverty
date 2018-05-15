var containerList = document.querySelectorAll(".container-list");
var dotCircle = document.querySelectorAll(".dot-circle");
let last = 0, j = 0;
let len = containerList.length;
let headMask  = document.querySelector('.headMask');
console.log(headMask)
//轮播
function changeStyle(i, last) {
    containerList[last].style.zIndex = 0;
    dotCircle[last].setAttribute('class', 'dot-circle');
    headMask.style.backgroundImage = 'url(/img/home/lunbo'+(i+1)+'.jpg)'
    containerList[i].style.zIndex = 1;
    dotCircle[i].className += ' dot-active';
}
changeStyle(0, 0);
function autoSlider() {
    if(j < len - 1) {
        j ++;
        changeStyle(j, last);
    } else {
        j = 0;
        changeStyle(j, last);
    }
    last = j;
}
var keep = setInterval(autoSlider, 4000)

for(let i = 0; i  < len; i ++) {
    dotCircle[i].addEventListener('mouseenter', function() {
        clearInterval(keep);
        changeStyle(i, last);
        last = i;
        j = last;
    })
    containerList[i].addEventListener('mouseenter', function() {
        clearInterval(keep);
    })
    containerList[i].addEventListener('mouseout', function() {
        clearInterval(keep);
        keep = setInterval(autoSlider, 4000)
    })
}
document.addEventListener("visibilitychange", function(){
    if(document.hidden == true) {
        clearInterval(keep);
    } else {
        keep = setInterval(autoSlider, 4000)
    }
});
//tag切换
var headerNav = document.querySelectorAll('.header-nav-list');
var flag = [true,false,false,false];
var lastIndex = 0;
for(let i = 0, len = headerNav.length; i < len; i ++) {
    headerNav[i].addEventListener('mouseenter', function(){
        if(flag[i]) return 
        headerNav[i].className = 'header-nav-hover';
    })
    headerNav[i].addEventListener('mouseleave', function(){
        if(flag[i]) return 
        headerNav[i].className = 'header-nav-list';
    })
}
var login = document.querySelector('#login');
