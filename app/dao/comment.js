const { Comment } = require('../model/Comment');
const { sequelize } = require('../core/db');
const { Reply } = require('../model/Reply');
const { Article } = require('../model/Article');
class CommentDao {
    static createComment(info, success) {//创建留言
        Article.findOne({
            where: {
                article_id: info.article_id
            }
        }).then(val => {
            if (!val) { //val 为null 没有找到留言对应的文章
                success(new global.errs.NotFound('留言对应的文章不存在'))
                return;
            }
            Comment.findOne({
                where: {
                    name: info.name
                }
            }).then(res => {
                if (res) {
                    success(new global.errs.Existed('昵称已被使用了，换个吧'))
                    return;
                }
                const c = new Comment();
                c.content = info.content;
                c.article_id = info.article_id;
                c.name = info.name;
                c.save().then((res) => {
                   
                    //res.dataValues 添加的数据对象
                    success(false, { msg: '添加成功', success: true, comment_id: res.dataValues.id});
                }).catch(err => { success(new global.errs.HttpException()); console.log(err); })
            })

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
            order: [[desc]],
            attributes: {
                exclude: ['updated_at', 'email']
            },
            distinct: true,//去重，防止count出现错误，主表多少条数据count就是多少
            include: [ //获取查询到的每条留言下的回复，根据定义的外键关系查找
                {
                    model: Reply,                  
                    attributes: {
                        exclude: ['updated_at', 'email']
                    }
                }
            ]
        }).then((comments) => {
            if (comments.rows.length !== 0) {
                let totalReplies = 0;
                comments.rows.forEach((item, index) => {
                    totalReplies += item.replies.length;
                })
                success(false, {
                    data: comments.rows,
                    meta: {
                        totalComments:comments.count,
                        totalReplies: totalReplies,
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
    static getCommentAll(page = 1, desc = "created_at", success) {
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
            console.log(err)
            success(new global.errs.HttpException());
        })
    }
}
module.exports = {
    CommentDao
};
