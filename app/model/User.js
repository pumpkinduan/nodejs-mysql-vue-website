/**
 * @ 用户数据库模型
 **/
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
class User extends Model {}
User.init({//初始化管理员信息
    account: {
        type: Sequelize.STRING(32)
    },//管理员名称
    password: {
        type: Sequelize.STRING(64)
    }
}, {
  sequelize,
  tableName: 'User'
})
module.exports = {
    User
}