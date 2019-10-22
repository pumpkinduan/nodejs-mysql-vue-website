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
    static createOneQuotation(quotation_add, success) {
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
        }).catch(err => success(new global.errs.HttpException()));
    }
    static deleteOneQuotation(id, success) {
        Quotation.findOne( {
            where: {
                q_id: id
            }
        }).then( (quotation) => {
                if (quotation) {
                    quotation.destroy().then(res => {
                        success(false, {
                            msg: '删除成功',
                            success: true
                        })
                    }) 
                } else {
                    success(new global.errs.NotFound('数据不存在'))
                }
        } ).catch( err => {
            console.log(err)
        })
    }
    static updateQuotationById(id, info, success) {//更新文章
        Quotation.findOne({
            where: {
                q_id: id
            }
        }).then(quotation => {
            if (quotation) {
                quotation.update({
                    'author': info.author,
                    'content': info.content,
                }).then(res => {
                    success(false, { msg: '更新成功', success: true });
                })
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            throw err;
        })
    }
    static getQuotationList(page = 1, desc = "created_at", success) {//获取quotation列表
        const pageSize = 5; //每页的quotation数量
        Quotation.findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [[desc, 'DESC']] //按照quotation创建的时间倒序查找
        }).then((quotation) => {
            if (quotation.rows.length !== 0) {
                success(false, {
                    data: quotation.rows,
                    meta: {
                        count: quotation.count,
                        pageSize: pageSize,
                        success: true
                    }
                })
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            throw err;
        })
    }
}
module.exports = {
    quotationDao
};
