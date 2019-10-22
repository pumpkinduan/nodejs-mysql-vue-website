const { Me } = require('../model/me');
class meDao {
    static createMe(info, success) {
        Me.findOne({
            where: {
                content: info.content
            }
        }).then(val => {
            if ( !val ) {
                const me = new Me();
                me.content = info.content;
                me.cover = info.cover;
                me.save().then(
                    val => {
                        success(false, { msg: "创建成功", success: true });
                    }
                ).catch(
                    err => {
                        success(new global.errs.HttpException());
                    }
                )
            } else {
                success(new global.errs.Existed('不可重复创建'));
            }
        })
    }
    static getLatestMe(success) {
        Me.findAndCountAll({
            limit: 1,
            order: [[
                'created_at', 'DESC'
            ]]
        }).then(val => {
            if (val) {
                success(
                    false,
                    {
                        data: val.rows,
                        success: true
                    }
                )
            } else {
                success(new global.errs.NotFound());
            }
        })
    }
    static updateMe(id, info, success) {
        Me.findByPk(id).then( me => {
            if ( me && info ) {
                me.update({
                    'content': info.content,
                    'cover': info.cover
                }).then(res => {
                    console.log(res)
                    success(false, { msg: '更新成功', success: true });
                })
            } else {
                success(new global.errs.NotFound('所请求的资源不存在'));
            }
        }).catch( err => {
            console.log(err);
            success(new global.errs.HttpException());
        })
    }
    static deleteOneMe(id, success) {
        Me.findOne( {
            where: {
                id
            }
        }).then( (me) => {
                if (me) {
                    me.destroy().then(res => {
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
    static getMeList(page = 1, desc = "created_at", success) {//获取quotation列表
        const pageSize = 5; //每页的quotation数量
        Me.findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [[desc, 'DESC']] //按照quotation创建的时间倒序查找
        }).then((me) => {
            if (me && me.rows.length !== 0) {
                success(false, {
                    data: me.rows,
                    meta: {
                        count: me.count,
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
    meDao
}