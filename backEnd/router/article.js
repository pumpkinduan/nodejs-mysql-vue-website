
let app = require('express');
let loader = require('../loader');
let articleRouter = app.Router();// return a mini-app 
const passport = require('passport');
articleRouter.post('/create', passport.authenticate('jwt', {session: false}), loader.get('article/create'));
articleRouter.get('/list', loader.get('article/list'));
articleRouter.get('/detail/:id', loader.get('article/detail'));
articleRouter.delete('/delete/:id',passport.authenticate('jwt', {session: false}), loader.get('article/delete'));
articleRouter.put('/update/:id', passport.authenticate('jwt', {session: false}), loader.get('article/update'));
module.exports = articleRouter