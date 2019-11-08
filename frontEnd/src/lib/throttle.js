function throttle(handle, delay) {
    var timerId = null;
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        let self = this;//DOM元素
        let args = arguments;//事件对象
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function () {
            handle.apply(self, args);
            flag = true;
        }, delay || 300);
    }
}
export {
    throttle
}