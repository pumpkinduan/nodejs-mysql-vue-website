//配置passport-jwt 进行token解析，用户认证
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const { User } = require('../model/User');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //解码客户端发过来的token，并用jwt_payload参数接受
        User.findOne({
            where: {
                account: jwt_payload.account
            }
        }).then( (user) => {
            if ( user ) {
                done(null, user) //将查询到的user注入到request.user中,执行下一个路由中间件函数
            } else {
                done(null, false)
                // 客户端发来的token与服务器之前返回的token不一致
                //Unauthorized 直接返回客户端401,用户未认证成功,不在执行下一个路由中间件函数
            }
        }).catch( err => {
            done(err, false)//将错误err注入到request.user中
        })
    }));
}
