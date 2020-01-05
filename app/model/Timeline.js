/**
 * @ 文章数据表模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Timeline extends Model { }
Timeline.init({
    title: Sequelize.STRING(32),
    description: Sequelize.STRING(64),
    author: {
        type: Sequelize.STRING(16),
        defaultValue: 'Pumpkin'
    },
    status: {
        type: Sequelize.STRING(16),
        comment: '文章的发布或修改状态'
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
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
    tableName: 'Timeline'
})
.sync({alter: false});//增加或删除字段时自动适应数据表
module.exports = {
    Timeline
}