const app = require('express');
const meRouter = app.Router();
const loader = require('../loader');
meRouter.post('/create', loader.get('me/create'))
meRouter.get('/exact', loader.get('me/exact'))
module.exports = meRouter