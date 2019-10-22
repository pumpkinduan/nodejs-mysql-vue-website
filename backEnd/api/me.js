const map = new Map();
const { meDao } = require('../dao/me');
const { reactToClient } = require('../util/response');
function _create(req, res, next) {
    const info = req.body;    
    meDao.createMe(info, function(err, data) {
        reactToClient(res, err, data)
    })
}
function _exact(req, res, next) {
    meDao.getLatestMe(function(err, data) {
        reactToClient(res, err, data)
    })
}
function _list(req, res, next) {
    const {page, desc} = req.query;
    meDao.getMeList(page, desc, function(err, data) {
        reactToClient(res, err, data)
    })
}
function _update(req, res, next) {
    const { id } = req.params;
    const info = req.body;
    meDao.updateMe(id, info, function(err, data) {
        reactToClient(res, err, data)
    })
}
function _delete(req, res, next) {
    const { id } = req.params;
    meDao.deleteOneMe(id, function(err, data) {
        reactToClient(res, err, data)
    })
}
map.set('me/create', _create);
map.set('me/exact', _exact);
map.set('me/update', _update);
map.set('me/list', _list);
map.set('me/delete', _delete);
module.exports = map;