//从数据库中查询user信息
const { Imgs } = require('../model/Imgs');
const { sequelize } = require('../core/db');
const fs = require('fs');
class ImgsDao {
    static uploadPictureInfo(file, success) {
        let imgInfo = new Imgs();
        imgInfo.path = file.path;
        imgInfo.originalname = file.originalname;
        imgInfo.size = file.size;
        imgInfo.filename = file.filename;
        imgInfo.mimetype = file.mimetype;
        imgInfo.save().then(res => {
            success(false, { msg: '添加成功', success: true, path: file.path });
        }, err => console.log(err))

    }
    static _delete(path, success) {
        Imgs.findOne({
            where: {
                path
            }
        }).then((img) => {
            if (img) {
                fs.unlink(path)//删除服务器上的图片资源
                img.destroy()
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
module.exports = {
    ImgsDao
};
