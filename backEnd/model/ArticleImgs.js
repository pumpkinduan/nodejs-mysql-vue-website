//单独的用于存放文章中的图片地址的数据表
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class ArticleImgs extends Model { }
ArticleImgs.init({
    path: Sequelize.STRING,
    article_id:Sequelize.INTEGER,
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
    tableName: 'ArticleImgs'
})
module.exports = {
    ArticleImgs
}
