// register and login api
const map = new Map();
const { ArticleDao } = require('../dao/article');
const { reactToClient } = require('../util/response');
//创建文章
function createArticle(req, res, next) {
    const info = req.body;
    ArticleDao.createArticle(info, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取文章列表
function getArticleList(req, res, next) {
    const {page, desc} = req.query;
    const data = ArticleDao.getArticleList(page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
function getArticleDetailById(req, res, next) {
    const {id} = req.params;
    ArticleDao.getArticleDetailById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function deleteArticleById(req, res, next) {
    const {id} = req.params;
    ArticleDao.deleteArticleById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function updateBrowse(req, res, next) {
    const {id} = req.params;
    const info = req.body;
    console.log(info)
    ArticleDao.updateBrowse(id, info,(err, data) => {
        reactToClient(res, err, data)
    })
}
function updateArticleById(req, res, next) {
    const {id} = req.params;
    const info = req.body;
    ArticleDao.updateArticleById(id, info,(err, data) => {
        reactToClient(res, err, data)
    })
}
map.set('article/create', createArticle);
map.set('article/list', getArticleList);
map.set('article/detail', getArticleDetailById);
map.set('article/delete', deleteArticleById);
map.set('article/update', updateArticleById);
map.set('browse/update', updateBrowse);
module.exports = map;
