// register and login api
const map = new Map();
const { userDao } = require('../dao/user');
const { reactToClient } = require('../util/response');
function login(req, res, next) {
    const loginInfo = req.body;
    userDao.loginDao(loginInfo, function (err, data) {
        reactToClient(res, err, data)
    })
}
function register(req, res, next) {
    const registerInfo = req.body;
    userDao.registerDao(registerInfo, function (err, data) {
        reactToClient(res, err, data)
    })
}
function auth(req, res) {//返回用户认证成功的用户信息
    res.status(200).send({
        msg: 'success',
        errorCode: 000,
        data: {
            account: req.user.account,
            id: req.user.id
        }
    })
}
map.set('user/login', login);
map.set('user/register', register);
map.set('user/auth', auth);
module.exports = map;
