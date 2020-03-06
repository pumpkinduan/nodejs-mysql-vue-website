const express = require('express');
const app = new express();//main application
const globalConf = require('./config');
const passport = require('passport');
const compression = require('compression');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Max-Age", 36000);
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
});
app.use(compression());//开启GZip
app.use(express.static('../frontEnd/dist'));//前端页面
// app.use('/pictures', express.static('pictures'));//前端页面
app.use(express.json()) // for parsing application/json 会将其解析后的json对象存到req.body中
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
require('./app/core/passport')(passport);// passport-jwt 验证
const initEntrance = require('./app/core/init');
new initEntrance(app);
app.listen(globalConf.port);
  