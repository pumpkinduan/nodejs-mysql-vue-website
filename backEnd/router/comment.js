let app = require('express');
let loader = require('../loader');
let commentRouter = app.Router();// return a mini-app 
commentRouter.post('/create',loader.get('comment/create'));
commentRouter.get('/list', loader.get('comment/list'));
commentRouter.get('/article/comments', loader.get('comment/article_comment'));
commentRouter.delete('/delete/:id', loader.get('comment/delete'));
module.exports = commentRouter