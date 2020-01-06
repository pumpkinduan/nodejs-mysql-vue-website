//连接数据库
const Sequelize = require('sequelize');
const { host, port, password, database, user } = require('./dbConfig').database;  
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',//连接mysql数据库
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {//定义通用数据库模型 [options]参数
        timestamps: true,//为模型添加 createdAt 和 updatedAt 两个时间戳字段
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        scopes: {
          a_list: {
            attributes: { //只查找attributes里规定的字段
              exclude: ['content', 'updated_at', 'deleted_at', 'id'] //排除这些字段不查找
            }
          },
          a_archives: {
            attributes: ['title', 'year', 'date']
          }
        },
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      }
    }
    
});
// Sync all models that aren't already in the database
// using `force: true` will drop the table if it already exists
sequelize.sync({force: false, alter: false}).then(console.log('table has been created')).catch(e => console.log(e))
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = {
    sequelize
}