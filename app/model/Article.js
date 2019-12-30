/**
 * @ 文章数据表模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Article extends Model { }
Article.init({
    type: {//type == 0表示文章, type == 1表示博客
        defaultValue: 0,
        type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING(32),
    author: Sequelize.STRING(16),
    tag: Sequelize.STRING(16),
    content: Sequelize.TEXT,
    cover: Sequelize.STRING,//文章封面
    description: Sequelize.TEXT,
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_char: Sequelize.INTEGER,
    article_id: {
        type: Sequelize.INTEGER,
        defaultValue: +Date.now().toString().slice(5)
    },
    year: {
        type: Sequelize.STRING,
        defaultValue: moment(Date()).format('YYYY')
    },
    date: {
        type: Sequelize.STRING,
        defaultValue: moment(Date()).format('MM-DD')
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
.sync({alter: false});//增加或删除字段时自动适应数据表
module.exports = {
    Article
}