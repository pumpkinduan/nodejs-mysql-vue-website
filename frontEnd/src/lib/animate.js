
    function animate(obj, json, type, callback) {
        var speed, currentSty, stop;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            stop = true;
            if (type == 'fastToSlow') {
                var k = 15;
                for (var attr in json) {
                    if (attr == 'opacity') {
                        currentSty = parseFloat(getStyle(obj, attr)) * 100;
                        json[attr] = json[attr] * 100;
                    } else {
                        currentSty = parseInt(getStyle(obj, attr));
                    }
                    speed = (json[attr] - currentSty) / k;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style[attr] = json[attr];
                        } else {
                            obj.style[attr] = json[attr] + 'px';
                        }
                    } else {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style.opacity = (speed + currentSty) / 100;
                        } else {
                            obj.style[attr] = speed + currentSty + 'px';
                        }
                    }
                    if (parseInt(obj.style[attr]) != json[attr]) {
                        stop = false;
                    }
                }
                if (stop) {
                    clearInterval(obj.timer)
                    typeof callback == 'function' ? callback() : null;
                }
            }
            if (type == 'linear' || (!type)) {
                for (var attr in json) {
                    if (attr == 'opacity') {
                        currentSty = parseFloat(getStyle(obj, attr)) * 100;
                        json[attr] = json[attr] * 100;
                    } else {
                        currentSty = parseInt(getStyle(obj, attr));
                    }
                    speed = 10;
                    speed = json[attr] - currentSty > 0 ? speed : -speed;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style[attr] = json[attr];
                        } else {
                            obj.style[attr] = json[attr] + 'px';
                        }
                    } else {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style.opacity = (speed + currentSty) / 100;
                        } else {
                            obj.style[attr] = speed + currentSty + 'px';
                        }
                    }
                    if (parseInt(obj.style[attr]) != json[attr]) {
                        stop = false;
                    }
                }
                if (stop) {
                    clearInterval(obj.timer);
                    typeof callback == 'function' ? callback() : '';
                }
            }
            if (type == 'slowToFast') {
                var k = 0.5;
                for (var attr in json) {
                    if (attr == 'opacity') {
                        currentSty = parseFloat(getStyle(obj, attr)) * 100;
                        json[attr] = json[attr] * 100;
                    } else {
                        currentSty = parseInt(getStyle(obj, attr));
                    }
                    speed = currentSty * k + 1;
                    speed = json[attr] - currentSty > 0 ? speed : -speed;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style[attr] = json[attr];
                        } else {
                            obj.style[attr] = json[attr] + 'px';
                        }
                    } else {
                        if (attr == 'opacity') {
                            json[attr] = json[attr] / 100;
                            obj.style.opacity = (speed + currentSty) / 100;
                        } else {
                            obj.style[attr] = speed + currentSty + 'px';
                        }
                    }
                    if (parseInt(obj.style[attr]) != json[attr]) {
                        stop = false;
                    }
                }
                if (stop) {
                    clearInterval(obj.timer);
                    typeof callback == 'function' ? callback() : '';
                }
            }
        }, 1000 / 60)
    }
    function getStyle(elem, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null)[prop];
        } else {
            return elem.currentStyle[prop];
        }
    }
module.exports = {
    animate,
    getStyle
}
