const express = require('express');
const app = new express();//main application
const globalConf = require('./config');
const passport = require('passport');
app.use(express.json()) // for parsing application/json 会将其解析后的json对象存到req.body中
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
require('./core/passport')(passport);// passport-jwt 验证
const initEntrance = require('./core/init');
new initEntrance(app);
app.listen(globalConf.port, () => {
    console.log(`server is running`);
});
module.exports = null;