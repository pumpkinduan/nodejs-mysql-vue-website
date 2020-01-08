const map = new Map();
const { ImgsDao } = require('../dao/img');
const { reactToClient } = require('../util/response');
//上传图片
function upload(req, res, next) {
    const type = req.body.type
    ImgsDao.uploadPictureInfo(req.file, type, function (err, data) {
        reactToClient(res, err, data)
    })
}

function getAllImgs(req, res, next) {
    const { type, page } = req.query;
    ImgsDao.getAllImgs({type, page}, (err, data) => {
        reactToClient(res, err, data)
    });
}
function deleteImg(req, res, next) {
    const { path } = req.query;
    ImgsDao.deleteImg(path, (err, data) => {
        reactToClient(res, err, data)
    });
}
map.set('upload', upload);
map.set('upload/delete', deleteImg);
map.set('upload/getAllImgs', getAllImgs);
module.exports = map;
