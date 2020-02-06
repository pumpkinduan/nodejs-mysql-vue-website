//单独的用于存放文章中的图片地址的数据表
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Imgs extends Model { }
Imgs.init({
    path: Sequelize.STRING,
    originalname: Sequelize.STRING,
    size: Sequelize.INTEGER,
    filename: Sequelize.STRING,
    mimetype: Sequelize.STRING,
    type: { // 0: 文章下的图片；1：相册墙的图片
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
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
    tableName: 'imgs'
})
module.exports = {
    Imgs
}
