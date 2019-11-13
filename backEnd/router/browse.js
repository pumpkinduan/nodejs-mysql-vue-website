let app = require('express');
let loader = require('../loader');
let browseRouter = app.Router();// return a mini-app 
browseRouter.put('/update/:id', loader.get('browse/update'));
module.exports = browseRouter