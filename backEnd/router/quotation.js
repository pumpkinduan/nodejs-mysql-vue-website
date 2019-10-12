const app = require('express');
let loader = require('../loader');
const quotationRouter = app.Router();
quotationRouter.get('/exact', loader.get('quotation/exact'));
quotationRouter.post('/create', loader.get('quotation/create'));
module.exports = quotationRouter;