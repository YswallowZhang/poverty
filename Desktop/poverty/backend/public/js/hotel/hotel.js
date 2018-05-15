var lastBtn = document.querySelector('.lastBtn');
var nextBtn = document.querySelector('.nextBtn');
var pageNum = 0;
var runPage = document.querySelectorAll('.runPage');
var length = food.length;
var runAll =  6;
for(let i = 0; i < runPage.length; i ++) {
    runPage[i].style.zIndex = runAll - i;
    runPage[i].getElementsByTagName("div")[0].style.zIndex = runAll -  i;
    runPage[i].getElementsByTagName("img")[0].style.zIndex = runAll - 1 - i;
}
nextBtn.addEventListener('click', () => {
    if ( pageNum < length - 1) {
        runNext(pageNum);
        pageNum ++;
    };
})

function runNext(index){
    runPage[index].className += ' runClass';
    zIndexNext(index,runPage[index]);
}

function zIndexNext(index,element){
    if ( index >=  1) {
        element.style.zIndex = 3 + index;
    };	
    setTimeout(function(){
        if (index == 0) {
            element.style.zIndex = 3 + index;
        };
        element.getElementsByTagName("div")[0].style.zIndex = runAll - 1 + index;
        element.getElementsByTagName("img")[0].style.zIndex = runAll + 2 + index;		
    },1000);
}
lastBtn.addEventListener('click', () => {
    if ( pageNum >= 1 ) {				
        pageNum --;
        runLast(pageNum);
    };
})

function runLast(index){
    runPage[index].className = runPage[index].className.replace('runClass','');
    zIndexLast(index,runPage[index]);
}

function zIndexLast(index,element){
    if (index == 0) {
        element.style.zIndex = runAll - index;
    };
    setTimeout(function(){
        element.style.zIndex = runAll -  index;
        element.getElementsByTagName("div")[0].style.zIndex = runAll - index;
        element.getElementsByTagName("img")[0].style.zIndex = runAll -1 - index;
    },1000);
}

var likeImg = document.querySelectorAll('.liek-img');
for(let i = 0,len = likeImg.length; i < len; i ++) {
    likeImg[i].addEventListener('click', (event) => {
        likeImg[i].src = "/img/hotel/点赞后.png";
        event.stopPropagation();
    })
}
