
    function animate(obj, json, type, callback) {
        let speed, currentSty, stop;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            stop = true;
            if (type == 'fastToSlow') {
                let k = 15;
                for (let attr in json) {
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
                for (let key in json) {
                    if (key == 'opacity') {
                        currentSty = parseFloat(getStyle(obj, key)) * 100;
                        json[key] = json[key] * 100;
                    } else {
                        currentSty = parseInt(getStyle(obj, key));
                    }
                    speed = 10;
                    speed = json[key] - currentSty > 0 ? speed : -speed;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (Math.abs(json[key] - currentSty) <= Math.abs(speed)) {
                        if (key == 'opacity') {
                            json[key] = json[key] / 100;
                            obj.style[key] = json[key];
                        } else {
                            obj.style[key] = json[key] + 'px';
                        }
                    } else {
                        if (key == 'opacity') {
                            json[key] = json[key] / 100;
                            obj.style.opacity = (speed + currentSty) / 100;
                        } else {
                            obj.style[key] = speed + currentSty + 'px';
                        }
                    }
                    if (parseInt(obj.style[key]) != json[key]) {
                        stop = false;
                    }
                }
                if (stop) {
                    clearInterval(obj.timer);
                    typeof callback == 'function' ? callback() : '';
                }
            }
            if (type == 'slowToFast') {
                let k = 0.5;
                for (let val in json) {
                    if (val == 'opacity') {
                        currentSty = parseFloat(getStyle(obj, val)) * 100;
                        json[val] = json[val] * 100;
                    } else {
                        currentSty = parseInt(getStyle(obj, val));
                    }
                    speed = currentSty * k + 1;
                    speed = json[val] - currentSty > 0 ? speed : -speed;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (Math.abs(json[val] - currentSty) <= Math.abs(speed)) {
                        if (val == 'opacity') {
                            json[val] = json[val] / 100;
                            obj.style[val] = json[val];
                        } else {
                            obj.style[val] = json[val] + 'px';
                        }
                    } else {
                        if (val == 'opacity') {
                            json[val] = json[val] / 100;
                            obj.style.opacity = (speed + currentSty) / 100;
                        } else {
                            obj.style[val] = speed + currentSty + 'px';
                        }
                    }
                    if (parseInt(obj.style[val]) != json[val]) {
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
export {
    animate,
    getStyle
}
