var melonBox = document.querySelector('.melon-box');

window.onscroll = function(event) {
    var curTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(curTop >= 430) {
        melonBox.style.position = 'fixed';
        melonBox.style.top = 0;
    } else {
        melonBox.style.position = 'relative';
    }
}