const express = require('express');
const app = new express();//main application
const globalConf = require('./config');
const passport = require('passport');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Max-Age", 36000);
    // res.header("cache-control", 'max-age=36000');//强制缓存到浏览器，缓存时间为10h
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
});
app.use(express.static(globalConf.views_path));//前端页面
app.use('/pictures', express.static('pictures'));//前端页面
app.use('/admin', express.static(globalConf.admin_path));//后台页面
app.use(express.json()) // for parsing application/json 会将其解析后的json对象存到req.body中
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
require('./app/core/passport')(passport);// passport-jwt 验证
const initEntrance = require('./app/core/init');
new initEntrance(app);
app.listen(globalConf.port, () => {
    console.log(`server is running`);
});
  