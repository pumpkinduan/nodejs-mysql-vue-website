const { Reply } = require('../model/Reply');
const { sequelize } = require('../core/db');
const { Comment } = require('../model/Comment');
class ReplyDao {
    static createReply(info, success) {
        Comment.findByPk(info.comment_id).then(val => {
            if (!val) {
                success(new global.errs.NotFound('回复的留言不存在'))
                throw new global.errs.NotFound('回复的留言不存在');  
            }
            const r = new Reply();
            r.content = info.content;
            r.name = info.name;
            r.comment_id = info.comment_id;
            r.parent_comment = info.parent_comment;
            r.parent_name = info.parent_name;
            r.save().then((res) => {
                success(false, { msg: '添加成功', success: true });
            }).catch(err => { success(new global.errs.HttpException()); console.log(err); })
        })
    }
    //全部回复
    static getReplyAll(page = 1, success) {
        const pageSize = 5;
        Reply.findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [["created_at", "DESC"]]
        }).then((reply) => {
            if (reply.rows.length !== 0) {
                success(false, {
                    data: reply.rows,
                    meta: {
                        count: reply.count,
                        pageSize: pageSize,
                        success: true
                    }
                });
            } else {
                success(new global.errs.NotFound('数据为空'));
            }
        }).catch(err => {
            success(new global.errs.HttpException());
        })
    }
    static deleteReplyById(id, success) {//删除文章
        Reply.findByPk(id).then(reply => {
            if (reply) {
                reply.destroy().then(res => {
                    success(false, { msg: '删除成功', success: true })
                });//删除查找到的一行数据
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
        })
    }
}
module.exports = {
    ReplyDao
};
