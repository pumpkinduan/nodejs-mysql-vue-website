const { Comment } = require('../model/Comment');
const { sequelize } = require('../core/db');

class CommentDao {
    static createComment(info, success) {//创建文章
        const c = new Comment();
        c.comment = info.comment
        c.name = info.name
        c.save().then((res) => {
            success(false, { msg: '添加成功', success: true });
        }).catch(err => { success(new global.errs.HttpException()); console.log(err); })
    }
    static getCommentList(page = 1, desc = "created_at", success) {
        const pageSize = 6;
        Comment.findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [[desc, 'DESC']] 
        }).then((Comment) => {
            if (Comment.rows.length !== 0) {
                success(false, {
                    data: Comment.rows,
                    meta: {
                        count: Comment.count,
                        pageSize: pageSize,
                        success: true
                    }
                });
            } else {
                success(new global.errs.NotFound('数据为空'));
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            console.log(err)
        })
    }
    static deleteCommentById(id, success) {//删除文章
        Comment.findByPk(id).then(comment => {
            if (comment) {
                comment.destroy().then(res => {
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
    CommentDao
};
