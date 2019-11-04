let app = require('express');
let loader = require('../loader');
let commentRouter = app.Router();// return a mini-app 
const passport = require('passport');
commentRouter.post('/create',loader.get('comment/create'));
commentRouter.get('/list', loader.get('comment/list'));
commentRouter.delete('/delete/:id', loader.get('comment/delete'));
module.exports = commentRouter