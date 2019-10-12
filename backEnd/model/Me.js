const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
class Me extends Model {}
Me.init({
    content: Sequelize.STRING,
    cover: Sequelize.STRING
},{
    sequelize,
    tableName: 'Me'
})
module.exports = {
    Me
}