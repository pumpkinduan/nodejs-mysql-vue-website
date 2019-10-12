/**
 * @ 文章数据库模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Article extends Model { }
Article.init({
    title: Sequelize.STRING(32),
    author: Sequelize.STRING(16),
    tag: Sequelize.STRING(16),
    content: Sequelize.TEXT,
    imgage_url: Sequelize.STRING,//文章内容中的图片url
    cover: Sequelize.STRING,//文章封面
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_char: Sequelize.STRING(16),
    article_id: {
        type: Sequelize.INTEGER,
        unique: true
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    tableName: 'Article'
})
module.exports = {
    Article
}