const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Comment extends Model { }
Comment.init({
    content: Sequelize.STRING(256),
    name: Sequelize.STRING(32),
    email: Sequelize.STRING(64),
    article_id: Sequelize.INTEGER,
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
        }
    }
}, {
    sequelize,
    tableName: 'comment',
    modelName: 'comment'
})
// .sync({alter: true});//增加或删除字段时自动适应数据表
module.exports = {
    Comment
}