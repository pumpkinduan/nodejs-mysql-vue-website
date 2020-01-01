function debounce(handler, delay) {
    var timer = null;
    return function () {
        var arg = arguments;//事件对象
        var self = this;//实际为DOM
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(function () {
            handler.apply(self, arg);
        }, delay)
    }
}
export {
    debounce
}