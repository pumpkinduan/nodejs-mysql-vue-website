import { animate } from '@/lib/animate.js'
import { throttle, addEvent } from "@/lib/tool.js";
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
        timerId = setInterval(function () {
            //document.scrollingElement兼容移动和PC
            let begin = document.scrollingElement.scrollTop; 
            let end = 0;
            let speed = (end - begin) * 0.3;
            if (Math.abs(end - begin) <= Math.abs(speed)) {
                document.documentElement.scrollTop = end;
                clearInterval(timerId);
            }
            //注意:给 document.documentElement.scrollTop设置值时不能带单位
            document.scrollingElement.scrollTop += speed;
        }, 30)
    }
    function bindEvent() {
        let btn = document.getElementById('backToTop');
        addEvent(btn, 'click', function () {
            move();
        })
        addEvent(document, 'scroll', throttle(function () {
            if (document.scrollingElement.scrollTop <= 0) {
                animate(btn, {
                    bottom: -80
                })
            } else {
                animate(btn, {
                    bottom: 40
                })
            }
        }, 150))
        //避免网页滚动时与鼠标滚轮并行触发而引起的回弹
        document.addEventListener('mousewheel', throttle(() => {
            clearInterval(timerId);
        }, 150), false)

    }
    function createBtn() {
        let div = document.createElement('div');
        div.innerHTML = ` <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <polyline 
        points="15 30, 25 20, 35 30"
        stroke-width="4"
        stroke="#eee"
        stroke-linecap="round"
        stroke-opacity="0.6"
         fill="transparent"
         stroke-linejoin="round"
         />
         
    </svg>`;
        div.id = 'backToTop';
        document.body.appendChild(div);
    }
    function setStyle() {
        let style = document.createElement('style');
        style.innerHTML = ` #backToTop {
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                background: rgba(0,0,0,.75);
                                position: fixed;
                                bottom: -50px;
                                right: 2%;
                                cursor: pointer;
                                z-index: 999999;
                            }
                            polyline {
                                transition: all .3s;
                            }
                            #backToTop:hover polyline {
                                stroke-opacity: .85;
                            }`;
        document.head.appendChild(style);
    }
}(window, document))