const app = require('express');
const meRouter = app.Router();
const loader = require('../loader');
meRouter.post('/create', loader.get('me/create'))
meRouter.get('/exact', loader.get('me/exact'))
meRouter.put('/update/:id', loader.get('me/update'))
meRouter.delete('/delete/:id', loader.get('me/delete'))
meRouter.get('/list', loader.get('me/list'))
module.exports = meRouter