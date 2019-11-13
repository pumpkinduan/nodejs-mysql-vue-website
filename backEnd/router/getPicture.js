let app = require('express');
let loader = require('../loader');
let getPicRouter = app.Router();// return a mini-app 
getPicRouter.get('/', loader.get('getPicture'));
module.exports = getPicRouter