function animate(obj, json, callback) {
    let speed, currentSty, stop;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        stop = true;
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