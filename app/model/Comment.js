const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Comment extends Model { }
Comment.init({
    content: Sequelize.STRING(256),
    name: Sequelize.STRING(32),
    article_id: Sequelize.INTEGER,
    article_title: Sequelize.STRING(64),
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
module.exports = {
    Comment
}