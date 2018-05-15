var nav = document.querySelector('.detail-thumb-nav');
var pho = nav.getElementsByTagName('div');
var navItem = document.querySelectorAll('.detail-thumb-nav-item');
var deplay = document.querySelector('.deplay-img');
var last = 0;
var hotel = JSON.parse(hotel)
pho[0].className = 'pho_cur';
var pic = hotel.hotel_pic.split(',');
for(let i = 0, len = navItem.length; i < len; i ++) {
    navItem[i].addEventListener('click', () => {
        pho[last].className = 'pho_layer';
        pho[i].className = 'pho_cur';
        deplay.src = '/img/hotel/' + pic[i]
        last = i;
    })
}
window.onload = function(){
    //直接加载地图    
    
    var geocoder,map,marker = null;
    var init = function() {
        var center = new qq.maps.LatLng(39.916527,116.397128);
        map = new qq.maps.Map(document.getElementById('map'),{
            center: center,
            zoom: 20
        });
        //调用地址解析类
        geocoder = new qq.maps.Geocoder({
            complete : function(result){
                map.setCenter(result.detail.location);
                var marker = new qq.maps.Marker({
                    map:map,
                    position: result.detail.location
                });
            }
        });
    }

    init();
    function codeAddress() {
        //通过getLocation();方法获取位置信息值
        geocoder.getLocation(hotel.hotel_position);
    }
    codeAddress();
}
let total = document.querySelector('#total');
let startFlag = false;
let times = 1;
let endDate, startDate;
let endFlag = false;
let start = document.querySelector('#startdate');
let end = document.querySelector('#enddate');
let onename = document.querySelector('#onename');
let telephone = document.querySelector('#telephone')
start.addEventListener('change', () => {
    startDate = new Date(start.value)
    startDate = Date.parse(startDate)
    startFlag = true;
    if(startFlag && endFlag) {
        times = (endDate - startDate) / 1000 / 60 / 60 / 24
        total.innerHTML = times * hotel.hotel_price;
    }

})
end.addEventListener('change', () => {
    endDate = new Date(end.value)
    endDate = Date.parse(endDate)
    endFlag = true;
    if(startFlag && endFlag) {
        times = (endDate - startDate) / 1000 / 60 / 60 / 24;
        total.innerHTML = times * hotel.hotel_price;
    }
})
var btn = document.querySelector('.right-bottom');
btn.addEventListener('click', () => {
    let date = getNowDate()
    var data = {
        hotel_name:hotel.hotel_name,
        check_in:start.value,
        check_out:end.value,
        customer:onename.value,
        telephone:telephone.value,
        price:total.innerHTML,
        hotel_pic:pic[0],
        user_name:username,
        date:date
    }
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/hotel/buy');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status==200){
            window.location = 'http://localhost:3000/user/center';
        }
    }
})

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