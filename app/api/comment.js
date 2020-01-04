// register and login api
const map = new Map();
const { CommentDao } = require('../dao/comment');
const { reactToClient } = require('../util/response');
//创建文章
function createComment(req, res, next) {
    const info = req.body;
    CommentDao.createComment(info, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取文章下的留言
function getArticleComments(req, res, next) {
    const { page, article_id } = req.query;
    CommentDao.getArticleComments(article_id, page, (err, data) => {
        reactToClient(res, err, data)
    });
}
//获取全部留言
function getCommentAll(req, res, next) {
    const { page} = req.query;
    CommentDao.getCommentAll(page, (err, data) => {
        reactToClient(res, err, data)
    });
}
function deleteCommentById(req, res, next) {
    const { id } = req.params;
    CommentDao.deleteCommentById(id, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('comment/create', createComment);
map.set('comment/list', getArticleComments);
map.set('comment/all', getCommentAll);
map.set('comment/delete', deleteCommentById);
module.exports = map;
