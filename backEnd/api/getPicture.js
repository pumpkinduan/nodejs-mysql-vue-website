const map = new Map();
const fs = require('fs');
function getPicture(req, res, next) {
    const { path, mimetype } = req.query;
    fs.readFile(path, function (err, data) {
        try {
            res.status(200).type(mimetype).send(data);
        } catch (error) {
            console.log(error)
        }

    });
}
map.set('getPicture', getPicture);
module.exports = map;