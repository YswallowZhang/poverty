var newsData, themeData, hotelData, goodsData, foodData, travelData;

var newsEditTitle = document.querySelector('#u-edit-news-title');//编辑页面标题
var newsEditDetail = document.querySelector('#u-edit-news-detail');//编辑页面细节
var newsEditPic = document.querySelector('#u-edit-news-pic');//编辑页面img
var newsEditBtn = document.querySelectorAll('.news-edit-btn');//编辑按钮
var newsEditFile = document.querySelector('#u-edit-news-flie');//编辑页面图片上传

var confirm = document.querySelector('.confirm');

function ajax(data, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            cover.style.display = 'block';
        }
    }
}
function getPic(file, img) {
    var file = file.files[0]; 
    var reader = new FileReader();  
    //创建文件读取相关的变量  
    var imgFile;  
  
    //为文件读取成功设置事件  
    reader.onload = function(e) {  
        imgFile = e.target.result; 
        img.setAttribute('src', imgFile); 
    };  
  
    //正式读取文件  
    reader.readAsDataURL(file);   
}

confirm.addEventListener('click', () => {
    cover.style.display = 'none';
})
//日期
function getNowDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}

var newsAddBtn = document.querySelector('.news-add-btn');//新增按钮
var newsEdit = document.querySelector('.news-edit');//编辑模块
var newsList = document.querySelector('.news-list');//列表模块
var newsAdd = document.querySelector('.news-add');//新增模块

var newsAddPic =  document.querySelector('#u-add-news-pic');//新增页面img
var newsAddTitle = document.querySelector('#u-add-news-title');//新增页面标题
var newsAddDetail = document.querySelector('#u-add-news-detail');//新增页面细节
var newsAddFile = document.querySelector('#u-add-news-file');//新增页面图片上传
var newsAddSubmit = document.querySelector('.news-add-submit');
//新增按钮
newsAddBtn.addEventListener('click', () => {
    newsAdd.style.display = 'block';
    newsList.style.display = 'none';
})
//编辑按钮
for(let i = 0, len = newsEditBtn.length; i < len; i ++) {
    newsEditBtn[i].addEventListener('click', () => {
        newsEdit.style.display = 'block';
        newsList.style.display = 'none';
        newsEditTitle.value = article[i].article_name;
        newsEditDetail.value = article[i].article_detail;
        newsEditPic.src = '/img/news/' + article[i].article_pics;
    })
}
//编辑input file
newsEditFile.addEventListener('change', () => {
    getPic(newsEditFile, newsEditPic);
})
//新增input file
newsAddFile.addEventListener('change', () => {
    getPic(newsAddFile, newsAddPic);
    newsAddPic.style.display = 'block';
})
//新增上传
newsAddSubmit.addEventListener('click', () => {
    var file = newsAddFile.files[0];
    newsAddData = {
        article_name:newsAddTitle.value,
        article_detail:newsAddDetail.value,
        article_time:getNowDate()
    }
    ajax(newsAddData, '/admin/add/news');
   
})
//编辑上传
newsEditSubmit.addEventListener('click', () => {
    newsEditData = {
        article_name:newsEditTitle.value,
        article_detail:newsEditDetail.value,
        article_pics:newsImg,
        article_time:getNowDate()
    }
    ajax(newsEditData, '/admin/edit/news');
})