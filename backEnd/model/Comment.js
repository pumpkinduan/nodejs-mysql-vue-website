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
    article_id: Sequelize.INTEGER,
    parent_id: { 
        //父级留言的id
        //该id字段有值，则表示该条留言为子（回复）留言，无则为父级（一级）留言
        type: Sequelize.INTEGER,
        default: null
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
        }
    }
}, {
    sequelize,
    tableName: 'Comment'
})
// .sync({alter: true});//增加或删除字段时自动适应数据表
module.exports = {
    Comment
}