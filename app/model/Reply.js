const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const { Comment } = require('./Comment.js');
const moment = require('moment');
class Reply extends Model { }
Reply.init({
    content: Sequelize.STRING(256),
    name: Sequelize.STRING(32),
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
        }
    }
}, {
    sequelize,
    tableName: 'reply',
    modelName: 'reply'
})
//一对多
//一条留言对应多条回复
Comment.hasMany(Reply, {//往Reply表中添加外键 字段comment_id
    foreginKey: 'comment_id',
    sourceKey: 'id'
})
Reply.belongsTo(Comment, {
    foreignKey: 'comment_id',
    targetKey: 'id'
})
module.exports = {
    Reply
}