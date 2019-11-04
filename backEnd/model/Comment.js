/**
 * @ 文章数据库模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Comment extends Model { }
Comment.init({
    comment: Sequelize.STRING(256),
    name: Sequelize.STRING(32),
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
    tableName: 'Comment'
}).sync({alter: true});//增加或删除字段时自动适应数据表
module.exports = {
    Comment
}