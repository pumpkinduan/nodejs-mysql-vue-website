//单独的用于存放文章中的图片地址的数据表
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Imgs extends Model { }
Imgs.init({
    url: Sequelize.STRING,
    originalname: Sequelize.STRING,
    size: Sequelize.INTEGER,
    filename: Sequelize.STRING,
    mimetype: Sequelize.STRING,
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
    tableName: 'Imgs'
}).sync({alter: true})
module.exports = {
    Imgs
}
