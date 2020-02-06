let fs = require('fs');
let arr = fs.readFileSync('./server.conf').toString().split('\r\n');
let globalConf = {};
for ( var i = 0; i < arr.length; i ++ ) {
    let temp = arr[i].split('=');
    globalConf[temp[0]] = temp[1];
}
module.exports = globalConf; 