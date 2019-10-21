const map = new Map();
const { quotationDao } = require('../dao/quotation');
const { reactToClient } = require('../util/response');
function _exact(req, res, next) {//提取最近一条
    quotationDao.getLatestQuotation(function (err, data) {
        reactToClient(res, err, data)
    })
}
function _list(req, res, next) {
    const {page, desc} = req.query;
    quotationDao.getQuotationList(page, desc, function (err, data) {
        reactToClient(res, err, data)
    })
}
function _create(req, res, next) {//创建
    const info = req.body;
    quotationDao.createOneQuotation(info, function (err, data) {
        reactToClient(res, err, data)
    })
}   
function _delete(req, res, next) {//删除
    const { id } = req.params;
    quotationDao.deleteOneQuotation(id, function (err, data) {
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
map.set('quotation/exact', _exact)
map.set('quotation/list', _list)
map.set('quotation/delete', _delete)
map.set('quotation/create', _create)
map.set('quotation/update', _update)
module.exports = map;