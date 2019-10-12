/**
 * @ 每日一句数据表模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
class Quotation extends Model { }
Quotation.init({
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    author: Sequelize.STRING(32),
    q_id: {
        type: Sequelize.INTEGER,
        unique: true
    }
}, {
    sequelize,
    tableName: 'Quotation'
})

module.exports = {
    Quotation
}