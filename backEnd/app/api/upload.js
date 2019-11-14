const map = new Map();
const { ImgsDao } = require('../dao/img');
const { reactToClient } = require('../util/response');
//上传图片
function upload(req, res, next) {
    console.log(req.file)
    ImgsDao.uploadPictureInfo(req.file, function (err, data) {
        reactToClient(res, err, data)
    })
}

//获取文章下的图片
function getPicByArticleId(req, res, next) {
    const { page, article_id, desc } = req.query;
    ImgsDao.getPictureByArticleId(article_id, page, desc, (err, data) => {
        reactToClient(res, err, data)
    });
}
function delePicById(req, res, next) {
    const { id } = req.params;
    ImgsDao.deleteCommentById(id, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('upload', upload);
map.set('upload/getPicture', getPicByArticleId);
map.set('upload/delePicture', delePicById);
module.exports = map;
