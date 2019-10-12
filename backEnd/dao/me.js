const { Me } = require('../model/me');
class meDao {
    static createAboutMe(info, success) {
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
    static exactAboutMe(success) {
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
}
module.exports = {
    meDao
}