import {animate} from '@/lib/animate.js'
(function (window, document) {
    var timerId = null;
    init();
    function init() {
        createBtn();
        bindEvent();
        setStyle();
    }
    function move() {
        clearInterval(timerId);
        timerId = setInterval(function() {
            let begin = document.documentElement.scrollTop;
            let end = 0;
            let speed = (end - begin) * 0.3;
            if ( Math.abs(end - begin) <= Math.abs(speed) ) {
                document.documentElement.scrollTop = end;
                clearInterval(timerId);
            }
             //注意:给 document.documentElement.scrollTop设置值时不能带单位
             document.documentElement.scrollTop += speed;
        }, 40)
    }
    function bindEvent() {
        var btn = document.getElementById('backToTop');
        btn.addEventListener('click', function() {
            move();
        }, false);
        document.addEventListener('scroll', function() {
            let speed = 5;
            if ( document.documentElement.scrollTop <=0 ) {
                animate(btn,{
                    bottom: -80
                })
            } else {
                animate(btn,{
                    bottom: 40
                })
            }
        },false);
    }
    function createBtn() {
        var div = document.createElement('div');
        div.innerHTML = 'TOP';
        div.id = 'backToTop';
        document.body.appendChild(div);
    }
    function setStyle() {
        var style = document.createElement('style');
        style.innerHTML = ` #backToTop {
                                width: 30px;
                                height: 40px;
                                border-radius: 8px;
                                background: rgba(0,0,0,.85);
                                text-align: center;
                                line-height: 40px;
                                color: #fff;
                                font-weight: 500;
                                position: fixed;
                                bottom: -40px;
                                right: 5%;
                                font-size: 12px;
                                cursor: pointer;
                                padding: 0 5px;
                                tansition: all .3s;
                            }`;
        document.head.appendChild(style);
    }
}(window, document))