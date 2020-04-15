function getPageOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else return {
        x: document.body.scrollLeft + document.documentElement.scrollLeft,
        y: document.body.scrollTop + document.documentElement.scrollTop
    }
}

function getViewportOffset() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatCode === "CSS1Compat") {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElemnt.clientHeight
        }
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}

//获取元素相对于文档的坐标
function getElementPosition(ele) {
    var result_X = 0,
        result_Y = 0;
    while (ele.offsetParent !== null) { //一直循环到根元素
        var parent = ele.offsetParent;
        var w = (parent.offsetWidth - parent.clientWidth) / 2; //有定位父级的左边框宽度
        var h = (parent.offsetHeight - parent.clientHeight) / 2; //有定位父级的下边框宽度
        result_X += (ele.offsetLeft + w); //每循环一次获取一个到有定位我的父级坐标，每次累加
        result_Y += (ele.offsetTop + h);
        ele = parent;
    }
    return {
        x: result_X,
        y: result_Y
    }
}
//封装一个事件函数来兼容各个浏览器addEvent();
function addEvent(elem, type, handler) {
    //elem为元素，type为事件类型，handle为处理事件的函数
    if (elem.addEventListener) {
        return elem.addEventListener(type, handler, false);
    } else if (elem.attatchEvent) {
        return elem.attatchEvent("on" + type, function () {
            handler.call(elem); //真正处理代码的函数放在handle里
            //由于该方法中的this指向的是window，则把该方法中的this指向转变为元素
        });
    } else {
        return elem["on" + type] = handler;
    }
}
//注:若绑定匿名函数，则无法解除
function removeEvent(ele, type, handler) {
    if (ele.removeEventListener) {
        return ele.removeEventListener(type, handler, false);
    } else if (ele.detachEvent) {
        return ele.detachEvent('on' + type, handler)
    } else {
        return ele['on' + type] = null;
    }
}

function debounce(handler, delay) {
    var timer = null;
    return function () {
        var arg = arguments; //事件对象
        var self = this; //实际为DOM
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            handler.apply(self, arg);
        }, delay)
    }
}

function throttle(fn, delay = 500) {
    let timer = null;
    let previous = 0;
    return function () {
        let now = Date.now();
        // 下次触发fn的剩余时间
        let remaining = delay - (now - previous);
        // 是否修改了系统的时间
        let altered = now - previous < 0;
        if (remaining <= 0 || altered) { //第一次立即执行
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, arguments);
            previous = now;
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, arguments);
            }, delay);
        }
    }
}
export {
    getPageOffset,
    addEvent,
    removeEvent,
    getViewportOffset,
    getElementPosition,
    debounce,
    throttle
}