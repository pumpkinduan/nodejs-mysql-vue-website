const map = new Map();
const { meDao } = require('../dao/me');
const { reactToClient } = require('../util/response');
function _create(req, res, next) {
    const info = req.body;    
    meDao.createAboutMe(info, function(err, data) {
        reactToClient(res, err, data)
    })
}
function _exact(req, res, next) {
    meDao.exactAboutMe(function(err, data) {
        reactToClient(res, err, data)
    })
}
map.set('me/create', _create);
map.set('me/exact', _exact);
module.exports = map;