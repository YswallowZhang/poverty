var detailBtnBuy = document.querySelectorAll('.detail-btn-buy');
var numberAmount = document.querySelectorAll('.number-amount');
var numberDescrease = document.querySelectorAll(".number-descrease");
var numberAdd = document.querySelectorAll('.number-add');
var coverWrap = document.querySelectorAll('.cover-warp');
var orderAdd = document.querySelectorAll('.order-deadd');
var orderName = document.querySelectorAll('.order-name');
var orderTele = document.querySelectorAll('.order-tele');
var orderConfirm = document.querySelectorAll('.order-confirm');
for(let i = 0 , len = numberDescrease.length; i < len; i ++) {
    numberDescrease[i].addEventListener('click', () => {
        if(numberAmount[i].value == 1) return 
        numberAmount[i].value --;
    })
    numberAdd[i].addEventListener('click', () => {
        numberAmount[i].value ++;
    })
    numberAmount[i].addEventListener('keyup', () => {
       if(isNaN(numberAmount[i].value)) {
        numberAmount[i].value = 1;
       }
    })
    detailBtnBuy[i].addEventListener('click', () => {
        coverWrap[i].style.right = '0px';
        coverWrap[i].style.zIndex = '2';

    })
    orderConfirm[i].addEventListener('click', () => {
        var data = {
            product_pic:goods[i].goods_pic,
            product_name:goods[i].goods_name,
            product_price:goods[i].goods_price,
            product_total:goods[i].goods_price * numberAmount[i].value,
            product_number:numberAmount[i].value,
            customer_name:orderName[i].value,
            customer_tele:orderTele[i].value,
            customer_add:orderAdd[i].value,
            order_time:getNowDate(),
            user_name:username,
        }
        ajax(data);
    })

}
function ajax(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/play/product/buy');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status==200){
            window.location = 'http://localhost:3000/user/center'
        }
    }
}
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
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();

    if (Hours >= 0 && Hours <= 9) {
    Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
    Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
    Seconds = "0" + Seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + Hours + seperator2 + Minutes
    + seperator2 + Seconds;
    return currentdate;
}