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
//获取所有文章
function getArchives(req, res, next) {
    const data = ArticleDao.getArchives((err, data) => {
        reactToClient(res, err, data)
    });
}
function getCategories(req, res, next) {
    const data = ArticleDao.getCategories((err, data) => {
        reactToClient(res, err, data)
    });
}
//获取文章列表
function getArticleList(req, res, next) {
    const { page } = req.query;
    const data = ArticleDao.getArticleList(page, (err, data) => {
        reactToClient(res, err, data)
    });
}
function getArticleListByTag(req, res, next) {
    const { tag } = req.query;
    const data = ArticleDao.getArticleListByTag(tag, (err, data) => {
        reactToClient(res, err, data)
    });
}
function getArticleDetailById(req, res, next) {
    const { id } = req.params;
    ArticleDao.getArticleDetailById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function deleteArticleById(req, res, next) {
    const { id } = req.params;
    ArticleDao.deleteArticleById(id, (err, data) => {
        reactToClient(res, err, data)
    })
}
function updateBrowse(req, res, next) {
    const { id } = req.params;
    const {browse} = req.body;
    ArticleDao.updateBrowse(id, browse, (err, data) => {
        reactToClient(res, err, data)
    })
}
function updateArticleById(req, res, next) {
    const { id } = req.params;
    const info = req.body;
    ArticleDao.updateArticleById(id, info, (err, data) => {
        reactToClient(res, err, data)
    })
}
map.set('createArticle', createArticle);
map.set('getArticleList', getArticleList);
map.set('getArticleListByTag', getArticleListByTag);
map.set('getCategories', getCategories);
map.set('getArchives', getArchives);
map.set('getArticleDetailById', getArticleDetailById);
map.set('deleteArticleById', deleteArticleById);
map.set('updateArticleById', updateArticleById);
map.set('browse/update', updateBrowse);
module.exports = map;
