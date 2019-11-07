const { Comment } = require('../model/Comment');
const { sequelize } = require('../core/db');

class CommentDao {
    static createComment(info, success) {//创建留言
        if (!Comment.findOne({ //留言信息对应的文章没有找到
            where: {
                article_id: info.article_id
            }
        })) {
            global.errs.NotFound('留言的相关文章不存在');
        }
        Comment.findOne({
            where: {
                name: info.name
            }
        }).then(val => {
            if (!val) {//名字不能重复
                const c = new Comment();
                c.comment = info.comment;
                c.article_id = info.article_id;
                c.name = info.name;
                c.parent_id = info.parent_id;
                c.save().then((res) => {
                    success(false, { msg: '添加成功', success: true });
                }).catch(err => { success(new global.errs.HttpException()); console.log(err); })
            } else {
                success(new global.errs.Existed('昵称已经被人使用啦'));
            }
        })
    }
    //文章下的留言
    static getArticleComments(article_id, page = 1, desc = "created_at", success) {
        const pageSize = 5;
        Comment.findAndCountAll({
            where: {
                article_id
            },
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [[desc]]
        }).then((comments) => {
            if (comments.rows.length !== 0) {
                success(false, {
                    data: comments.rows,
                    meta: {
                        count: comments.count,
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
    //全部留言
    static getCommentList(page = 1, desc = "created_at", success) {
        const pageSize = 5;
        Comment.findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [[desc]]
        }).then((comments) => {
            if (comments.rows.length !== 0) {
                success(false, {
                    data: comments.rows,
                    meta: {
                        count: comments.count,
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
