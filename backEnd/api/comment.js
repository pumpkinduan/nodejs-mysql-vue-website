// register and login api
const map = new Map();
const { CommentDao } = require('../dao/comment');
const { reactToClient } = require('../util/response');
//创建文章
function _create(req, res, next) {
    const info = req.body;
    CommentDao.createComment(info, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取文章下的留言
function _article_comment(req, res, next) {
    const { page, article_id, desc } = req.query;
    console.log(page, article_id)
    CommentDao.getArticleComments(article_id, page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
//获取全部留言
function _list(req, res, next) {
    const { page, desc } = req.query;
    CommentDao.getCommentList(page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
function _delete(req, res, next) {
    const { id } = req.params;
    CommentDao.deleteCommentById(id, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('comment/create', _create);
map.set('comment/list', _list);
map.set('comment/article_comment', _article_comment);
map.set('comment/delete', _delete);
module.exports = map;
