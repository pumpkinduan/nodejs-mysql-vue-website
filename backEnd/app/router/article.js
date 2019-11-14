
let app = require('express');
let loader = require('../../loader');
let articleRouter = app.Router();// return a mini-app 
const passport = require('passport');
articleRouter.post('/create', passport.authenticate('jwt', {session: false}), loader.get('createArticle'));
articleRouter.get('/', loader.get('getArticleList'));
articleRouter.get('/blog', loader.get('getBlogList'));
articleRouter.get('/list', loader.get('getAllList'));
articleRouter.get('/detail/:id', loader.get('getArticleDetailById'));
articleRouter.delete('/delete/:id',passport.authenticate('jwt', {session: false}), loader.get('deleteArticleById'));
articleRouter.put('/update/:id', passport.authenticate('jwt', {session: false}), loader.get('updateArticleById'));
module.exports = articleRouter