// register and login api
const map = new Map();
const { ReplyDao } = require('../dao/reply');
const { reactToClient } = require('../util/response');
//创建文章
function createReply(req, res, next) {
    const info = req.body;
    ReplyDao.createReply(info, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取全部留言
function getReplyAll(req, res, next) {
    const { page} = req.query;
    ReplyDao.getReplyAll(page, (err, data) => {
        reactToClient(res, err, data)
    });
}
function deleteReplyById(req, res, next) {
    const { id } = req.params;
    ReplyDao.deleteReplyById(id, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('reply/create', createReply);
map.set('reply/all', getReplyAll);
map.set('reply/delete', deleteReplyById);
module.exports = map;
