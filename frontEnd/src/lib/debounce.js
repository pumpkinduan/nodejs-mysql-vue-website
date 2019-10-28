function debounce(handle, delay) {
    var timerId = null;
    return function () {
        let self = this;//DOM元素
        let args = arguments;//事件对象
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function () {
            handle.apply(self, args);
        }, delay || 300);
    }
}
module.exports = {debounce}