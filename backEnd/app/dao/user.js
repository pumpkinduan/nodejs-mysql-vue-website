//从数据库中查询user信息
const { User } = require('../model/User');
const { sequelize } = require('../core/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateToken } = require('../util/generateToken');

class userDao {
    static loginDao(user, success) {
        User.findOne({
            where: {
                account: user.account
            }
        }).then((dataValue) => {
            if (dataValue) {//找到user，进行密码校验  
                // Load hash from your password DB.
                if (bcrypt.compareSync(user.password, dataValue.password)) {
                    let token = generateToken(dataValue.id, dataValue.account);
                    success(false, {
                        msg: '登录成功',
                        success: true,
                        token: 'Bearer ' + token
                    })
                } else {
                    success(new global.errs.ParaException('密码或账号错误，请重新输入'))
                }
            } else {
                success(new global.errs.ParaException('账号不存在，请先注册'));
            }
        }).catch(err => { console.log(err) })
    }
    static registerDao(user, success) {
        User.findOne({
            where: {
                account: user.account
            }
        }).then((dataValue) => {
            const admin = new User();//一个实例就是一行数据
            if (dataValue) {//若数据库中存在账号，不允许重名
                success(new global.errs.Existed('账号已存在，请重新注册'));
            } else {
                admin.account = user.account;
                bcrypt.hash(user.password, saltRounds).then((hash) => {
                    admin.password = hash;
                    admin
                        .save()//保存实例（数据）到数据库
                        .then((val) => {
                            success(false, { msg: '注册成功', success: true })
                        }).catch((err) => {
                            throw err
                        });
                });
            }
        }).catch(err => { console.log(err) })
    }
}
module.exports = {
    userDao
};
