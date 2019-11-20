const map = new Map();
const { ImgsDao } = require('../dao/img');
const { reactToClient } = require('../util/response');
//上传图片
function upload(req, res, next) {
    ImgsDao.uploadPictureInfo(req.file, function (err, data) {
        reactToClient(res, err, data)
    })
}

function _delete(req, res, next) {
    const { path } = req.params;
    ImgsDao._delete(path, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('upload', upload);
map.set('upload/delete', _delete);
module.exports = map;
