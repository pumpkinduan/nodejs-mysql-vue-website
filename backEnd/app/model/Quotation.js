/**
 * @ 每日一句数据表模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
class Quotation extends Model { }
const moment = require('moment');
Quotation.init({
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    author: Sequelize.STRING(32),
    q_id: {
        type: Sequelize.INTEGER,
        defaultValue: +Date.now().toString().slice(5),
        unique: true
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    tableName: 'Quotation'
})

module.exports = {
    Quotation
}