const map = new Map();
const { quotationDao } = require('../dao/quotation');
const { reactToClient } = require('../util/response');
function getLatestQuotation(req, res, next) {//提取最近一条
    quotationDao.getLatestQuotation(function (err, data) {
        reactToClient(res, err, data)
    })
}
function getQuotationList(req, res, next) {
    const {page, desc} = req.query;
    quotationDao.getQuotationList(page, desc, function (err, data) {
        reactToClient(res, err, data)
    })
}
function createOneQuotation(req, res, next) {//创建
    const info = req.body;
    quotationDao.createOneQuotation(info, function (err, data) {
        reactToClient(res, err, data)
    })
}   
function deleteOneQuotation(req, res, next) {//删除
    const { id } = req.params;
    quotationDao.deleteOneQuotation(id, function (err, data) {
        reactToClient(res, err, data)
    })
}
function updateQuotationById(req, res, next) {
    const {id} = req.params;
    const info = req.body;
    quotationDao.updateQuotationById(id, info,(err, data) => {
        reactToClient(res, err, data)
    })
}
map.set('quotation/exact', getLatestQuotation)
map.set('quotation/list', getQuotationList)
map.set('quotation/delete', deleteOneQuotation)
map.set('quotation/create', createOneQuotation)
map.set('quotation/update', updateQuotationById)
module.exports = map;