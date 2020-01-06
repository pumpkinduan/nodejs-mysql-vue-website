/**
 * @ 文章数据表模型
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
    description: Sequelize.TEXT,
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_char: Sequelize.INTEGER,
    article_id: {
        type: Sequelize.INTEGER,
        defaultValue: +Date.now().toString().slice(-6)
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
module.exports = {
    Article
}