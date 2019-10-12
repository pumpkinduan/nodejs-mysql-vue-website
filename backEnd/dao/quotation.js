//从数据库中查询user信息
const { Quotation } = require('../model/Quotation');
const { sequelize } = require('../core/db');
class quotationDao {
    static getLatestQuotation(success) {
        Quotation.findAndCountAll({//提取最近的一条
            limit: 1,
            order: [
                ['created_at', 'DESC']
            ]
        }).then(quotation => {
            quotation ? success(false, quotation) : success(new global.errs.NotFound('数据为空'))
        }).catch(err => console.log(err));
    }
    static createQuotation(quotation_add, success) {
        Quotation.findOne({
            where: {
                q_id: quotation_add.q_id
            }
        }).then(quotation => {
            if ( !quotation ) {
                const q = new Quotation();
                q.content = quotation_add.content;
                q.q_id = quotation_add.q_id;
                q.author = quotation_add.author;
                q.save().then( res => {
                    success(false, {msg:'创建成功',success: true});
                }).catch(err => console.log(err)) 
            } else {
                success(new global.errs.Existed('不可重复创建'));
            }
        }).catch(err => console.log(err));
    }
}
module.exports = {
    quotationDao
};
