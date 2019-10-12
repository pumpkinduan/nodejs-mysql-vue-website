// register and login api
const map = new Map();
const { ArticleDao } = require('../dao/article');
const { reactToClient } = require('../util/response');
//创建文章
function _create(req, res, next) {
    const info = req.body;
    ArticleDao.createArticle(info, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取文章列表
function _list(req, res, next) {
    const {page, desc} = req.params;
    const data = ArticleDao.getArticleList(page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
function _detail(req, res, next) {
    const {id} = req.params;
    ArticleDao.getArticleDetailById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function _delete(req, res, next) {
    const {id} = req.params;
    ArticleDao.deleteArticleById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function _update(req, res, next) {
    const {id} = req.params;
    const info = req.body;
    ArticleDao.updateArticleById(id, info,(err, data) => {
        reactToClient(res, err, data)
    })
}
map.set('article/create', _create);
map.set('article/list', _list);
map.set('article/detail', _detail);
map.set('article/delete', _delete);
map.set('article/update', _update);
module.exports = map;
