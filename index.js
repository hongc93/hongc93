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
var oLis=getEle("li");
var progress = getEle("#progress");
var loading = getEle("#loading");
var musicBtn = getEle("#musicBtn");
var musicAudio = getEle("#audio1");
var num=0;

var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

function fnLoad() {
    var arr = ['bg00.png', 'bg01.png', 'bg02.png', 'bg04.png'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();
        oImg.src = "images/" + arr[i];
        oImg.onload = function () {
            num++;
            //加载成功的图片的个数占所有图片的百分比就是progress的宽度
            progress.style.width = num / arr.length * 100 + "%";
            //动画执行完的时候都会触发webkitTransitionEnd这个事件
            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    loading.style.display="none";
                    oLis[0].className="zIndex";
console.log("111");
                    /*第二步实现上下滑动效果*/
                    [].forEach.call(oLis, function () {
                        console.log("222");
                        var oLi = arguments[0];
                        oLi.index = arguments[1];
                        oLi.addEventListener("touchstart", start, false);
                        oLi.addEventListener("touchmove", move, false);
                        oLi.addEventListener("touchend", end, false);

                    });
                }, false)
            }
        }
    }
}
fnLoad();



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




//->当页面加载完成后,我们开始播放我们的音频文件
window.addEventListener("load", function () {
    musicAudio.play();

    //->canplay:监听当前的音频文件是否可以播放了
    musicAudio.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "music move";
    }, false);

    //->给按钮绑定点击事件,单击的时候判断当前是否处于播放状态,播放状态让其暂停,暂停状态让其播放
    musicBtn.addEventListener("touchend", function () {
        if (musicAudio.paused) {//->是否为暂停状态,此时是暂停状态
            musicAudio.play();
            musicBtn.className = "music move";
        } else {
            musicAudio.pause();
            musicBtn.className = "music";
        }
    }, false);
}, false);
