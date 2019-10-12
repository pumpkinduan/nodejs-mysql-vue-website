const map = new Map();
const { quotationDao } = require('../dao/quotation');
const { reactToClient } = require('../util/response');
function _exact(req, res, next) {//提取
    quotationDao.getLatestQuotation(function (err, data) {
        reactToClient(res, err, data)
    })
}
function _create(req, res, next) {//创建
    const info = req.body;
    quotationDao.createQuotation(info, function (err, data) {
        reactToClient(res, err, data)
    })

}   
map.set('quotation/exact', _exact)
map.set('quotation/create', _create)
module.exports = map;