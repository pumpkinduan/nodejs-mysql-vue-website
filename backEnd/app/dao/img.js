//从数据库中查询user信息
const { Imgs } = require('../model/Imgs');
const { sequelize } = require('../core/db');
class ImgsDao {
    static uploadPictureInfo(file, success) {
       let imgInfo = new Imgs();
       imgInfo.url = file.path;
       imgInfo.originalname = file.originalname;
       imgInfo.size = file.size;
       imgInfo.filename = file.filename;
       imgInfo.mimetype = file.mimetype;
       imgInfo.save().then( res => {
        success(false, { msg: '添加成功', success: true, path: file.path});
       }, err => console.log(err))
    }
    static delePicById(id, success) {
        ArticleImgs.findOne( {
            where: {
                q_id: id
            }
        }).then( (quotation) => {
                if (quotation) {
                    quotation.destroy().then(res => {
                        success(false, {
                            msg: '删除成功',
                            success: true
                        })
                    }) 
                } else {
                    success(new global.errs.NotFound('数据不存在'))
                }
        } ).catch( err => {
            console.log(err)
        })
    }
}
module.exports = {
    ImgsDao
};
