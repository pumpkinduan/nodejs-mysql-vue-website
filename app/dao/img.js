//从数据库中查询user信息
const { Imgs } = require('../model/Imgs');
const { sequelize } = require('../core/db');
const fs = require('fs');
class ImgsDao {
    static uploadPictureInfo(file, type, success) {
        let imgInfo = new Imgs();
        imgInfo.type = type;
        imgInfo.path = file.path;
        imgInfo.originalname = file.originalname;
        imgInfo.size = file.size;
        imgInfo.filename = file.filename;
        imgInfo.mimetype = file.mimetype;
        imgInfo.save().then(res => {
            success(false, { msg: '添加成功', success: true, path: file.path });
        }, err => console.log(err))

    }
    //默认获取 相册墙 的图片
    static getAllImgs({ type = 1, page = 1 }, success) {
        const pageSize = 6; //每页的图片数量
        Imgs.findAndCountAll({
            limit: pageSize,
            offset: pageSize * (page - 1),
            attributes: ['path', 'originalname'],
            where: {
                type
            }
        }).then((imgs) => {
            if (imgs.rows && imgs.rows.length !== 0) {
                imgs.rows.forEach((item, index) => {
                    item.path = item.path.replace(/\\/gi, '/');
                })
                success(false, { msg: '获取成功', success: true, imgs: imgs.rows });
            } else {
                success(new global.errs.NotFound('相册墙为空'));
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    static deleteImg(path, success) {
        Imgs.findOne({
            where: {
                path
            }
        }).then((img) => {
            if (img) {
                fs.unlink(path, (err) => {
                    if (err) throw err;
                    img.destroy().then(suc => {
                        success(false, { msg: '删除成功', success: true })
                    })
                });//删除服务器上的图片资源
            } else {
                success(new global.errs.NotFound('找不到图片资源'));
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
module.exports = {
    ImgsDao
};
