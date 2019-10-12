//配置passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const { Admin } = require('../model/user');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //解码客户端发过来的token，并用jwt_payload参数接受
        Admin.findOne({
            id: jwt_payload.id
        }).then( (user) => {
            if ( user ) {
                done(null, user) //将查询到的user注入到request.user中
            } else {
                done(null, false)// 返回401,用户未认证成功
            }
        }).catch( err => { 
            done(err, false)//将错误err注入到request.user中
        })
    }));
}
