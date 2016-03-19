function getEle(ele) {
    ele = ele.replace(/(^ +| +$)/g, "");
    if (/^#/.test(ele)) {
        return document.querySelector(ele)
    } else {
        return document.querySelectorAll(ele);
    }
}

var main = getEle("#main");
var audioPlay=getEle("#bell");


var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}


//var oLis=getEle("#list").querySelectorAll("li");
var oLis=getEle("li");


/*第二步实现上下滑动效果*/
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);

});
function start(e) {
    this.startTouch = e.changedTouches[0].pageY; //鼠标点击时所在位置的纵坐标
    audioPlay.play();
}
function move(e) {
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.startTouch;/*移动的距离*/
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none"; //不是当前这张就全部隐藏
        }
        arguments[0].style.display = "none";
        arguments[0].className = "";
    });
    /*当前这一张的索引*/
    if (pos > 0) {/*↓*/
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -(winH+pos);

    } else if (pos<=0) {/*↑*/
        this.prevSIndex = (index == oLis.length-1 ? 0 : index + 1);
        var duration = winH+pos;
    }
    oLis[this.prevSIndex].style.display = "block";
    oLis[this.prevSIndex].className="zIndex";
}
function end(e) {
    if(this.flag){
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        //oLis[this.prevSIndex].style.webkitTransition = "0.7s";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
        }, false)



    }
}


document.addEventListener("touchmove",function(){

});



audioPlay.addEventListener("click", function(){
    bell.pause();
    utils.removeClass(this,"rotate");
}, false);


