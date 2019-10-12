//工具方法集合
module.exports.utiler = (function() {
    return {
        getFormateTime(){ //2019-8-4
                var date = new Date();
                var year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate();
                return `${year}-${month}-${day}`;
        },
        toJsonString(opt) { // obj -> jsonString
            return JSON.stringify(opt);
        }
    }
})()