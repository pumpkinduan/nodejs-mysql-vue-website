// register and login api
const map = new Map();
const { userDao } = require('../dao/user');
const { reactToClient } = require('../util/response');
function login(req, res, next) {
    const loginInfo = req.body;
    userDao.loginDao(loginInfo, function(err, data) {
        if (err) return res.status(200).send(err)
        res.status(200).send(data)
    })
}
function register(req, res, next) {
    const registerInfo = req.body;
    userDao.registerDao(registerInfo, function(err, data) {
        if (err) return res.status(200).send(err)
        res.status(200).send(data)
    })
}
function passport(req, res) {
    res.status(200).send({
        account: req.user.account,
        id: req.user.id,
        identity: req.user.identity
    })
}
map.set('user/login', login);
map.set('user/register', register);
map.set('user/passport', passport);
module.exports = map;
