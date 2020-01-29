const { Article } = require('../model/Article');
const { ImgsDao } = require('../dao/img.js');
const { sequelize } = require('../core/db');
const { handleGroupBy, transformToArr } = require('../util/handleGroupBy');
class ArticleDao {
    static createArticle(info, success) {//创建文章
        Article.findOne({
            where: {
                title: info.title
            }
        }).then((val) => {
            if (val) {
                success(new global.errs.Existed('不可重复创建'))
            } else {
                const article = new Article();
                article.type = info.type
                article.title = info.title;
                article.article_id = +Date.now().toString().slice(5);
                article.author = info.author;
                article.cover = info.cover;
                article.tag = info.tag;
                article.content = info.content;
                article.total_char = info.total_char;
                article.browse = info.browse;
                article.description = info.description
                article.save().then((res) => {
                    success(false, { msg: '添加成功', success: true });
                }).catch(err => { success(new global.errs.HttpException()); console.log(err); })
            }
        }).catch(err => {
            success(new global.errs.ParaException());
            console.log(err);
        })
    }
    static getArticleListByTag(tag, success) {
        Article.findAll({
            order: [['created_at', 'DESC']],
            attributes: ['article_id', 'created_at', 'title'],
            where: {
                tag
            }
        }).then((articles) => {
            if (articles.length !== 0) {
                success(false, {
                    data: articles,
                    meta: {
                        count: articles.length,
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
    static getCategories(success) {
        sequelize.query(
            'select `tag`, count(`tag`) as count from article group by tag;',
            {
                nest: true,
            }
        ).then((tags) => {
            if (tags.length !== 0) {
                success(false, {
                    data: tags,
                    meta: {
                        categories_count: tags.length,
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
    static getArchives(success) {
        sequelize.query(
            'select `year`, count(`year`) as count, group_concat(`date`) as dates, group_concat(`title`) as titles, group_concat(`article_id`) as article_id from article group by year order by year desc;',
            {
                nest: true,
            }
        ).then((articles) => {
            if (articles.length !== 0) {
                let count = 0;
                for (let i = 0; i < articles.length; i ++) {
                    count += articles[i].count
                }
                success(false, {
                    data: handleGroupBy(articles),
                    meta: {
                        count,
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
    static getArticleList(page = 1, success) {//获取文章列表
        const pageSize = 5; //每页的文章数量
        Article.scope('a_list').findAndCountAll({
            //分页
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [['created_at', 'DESC']] //按照文章创建的时间倒序查找
        }).then((article) => {
            if (article.rows && article.rows.length !== 0) {
                success(false, {
                    data: article.rows,
                    meta: {
                        count: article.count,
                        pageSize: pageSize,
                        success: true
                    }
                });
            } else {
                success(new global.errs.NotFound('数据为空'));
            }
        }).catch(err => {
            console.log(err)
            success(new global.errs.HttpException());
        })
    }
    static getArticleDetailById(id, success) {//获取文章详情
        Article.findOne({
            where: {
                article_id: id
            }
        }).then((article) => {
            //article没找到会返回null
            if (article) {
                success(false, {
                    data: article,
                    success: true
                })
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            throw err;
        })
    }
    static deleteArticleById(id, success) {//删除文章
        Article.findOne({
            where: {
                article_id: id
            }
        }).then(article => {
            if (article) { //data为Article的实例
                article.destroy().then(res => {
                    success(false, { msg: '删除成功', success: true })
                });//删除查找到的一行数据
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
        })
    }
    static updateBrowse(id, browse, success) {
        Article.findOne({
            where: {
                article_id: id
            }
        }).then(val => {
            val.update({
                'browse': browse
            }).then(res => {
                success(false, { msg: '访问量增加了', success: true })
            })
        })
    }
    static updateArticleById(id, info, success) {//更新文章
        Article.findOne({
            where: {
                article_id: id
            }
        }).then(article => {
            if (article) {
                article.update({
                    'title': info.title,
                    'content': info.content,
                    'total_char': info.total_char,
                    'tag': info.tag,
                    'author': info.author,
                    'browse': info.browse,
                    'description': info.description
                }).then(res => {
                    success(false, { msg: '更新成功', success: true });
                }).catch( err => {console.log(err)})
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            console.log(err)
        })
    }
}
module.exports = {
    ArticleDao
};
