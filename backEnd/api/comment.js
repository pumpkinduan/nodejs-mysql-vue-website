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
    const { page, article_id, desc } = req.query;
    CommentDao.getArticleComments(article_id, page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
//获取全部留言
function getCommentList(req, res, next) {
    const { page, desc } = req.query;
    CommentDao.getCommentList(page, desc, (err, data) => {
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
map.set('comment/list', getCommentList);
map.set('comment/all', getArticleComments);
map.set('comment/delete', deleteCommentById);
module.exports = map;
