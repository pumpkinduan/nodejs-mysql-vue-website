let app = require('express');
let loader = require('../../loader');
let uploadRouter = app.Router();// return a mini-app 
let multer = require('multer');
//按照年 月 日来生产目录
let date = new Date();
var storage = multer.diskStorage({//将上传的文件(文件是二进制数据格式)存在磁盘中
    destination:  `pictures/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    filename: function(req, file, cb) {//指定文件名
        cb(null, `${Date.now()+''.slice(4)}_${file.originalname}`)
    }
})
let upload = multer({
    storage: storage
})
//一次性上传一张图片
uploadRouter.post('/', upload.single('picture'), loader.get('upload'));
uploadRouter.delete('/delete/:path', loader.get('upload/delete'));
module.exports = uploadRouter