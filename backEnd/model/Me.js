const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const moment = require('moment');
class Me extends Model {}
Me.init({
    content: Sequelize.STRING,
    cover: Sequelize.STRING,
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
},{
    sequelize,
    tableName: 'Me'
})
module.exports = {
    Me
}