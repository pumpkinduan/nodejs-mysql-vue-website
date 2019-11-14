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
//获取文章和博客所有列表
function getAllList(req, res, next) {
    const {page, desc} = req.query;
    const data = ArticleDao.getAllList(page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
//获取文章列表
function getArticleList(req, res, next) {
    const {page, desc} = req.query;
    const data = ArticleDao.getArticleList(page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
//获取博客列表
function getBlogList(req, res, next) {
    const {page, desc} = req.query;
    const data = ArticleDao.getBlogList(page, desc, (err, data) => {
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
map.set('createArticle', createArticle);
map.set('getArticleList', getArticleList);
map.set('getBlogList', getBlogList);
map.set('getAllList', getAllList);
map.set('getArticleDetailById', getArticleDetailById);
map.set('deleteArticleById', deleteArticleById);
map.set('updateArticleById', updateArticleById);
map.set('browse/update', updateBrowse);
module.exports = map;
