let fs = require('fs');
let globalConf = require('./config');
let files = fs.readdirSync('./' + globalConf.api_path);//读取文件,返回文件名的数组集合
let map = new Map();
for ( var i = 0; i < files.length; i++ ) {
    let tempMap = require('./' + globalConf.api_path + '/' + files[i]);//加载执行web下的js文件
    //遍历map结构,取到对应得key,value
    for ( var [key, value] of tempMap) {
        if ( !map.has(key) ) {
            map.set(key, value);
        } else {//不允许同一个url对于多个处理函数
            throw new Error('url error ' + key);
        }
    }
}
module.exports = map;

