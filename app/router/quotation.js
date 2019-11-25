const app = require('express');
let loader = require('../../loader');
const quotationRouter = app.Router();
const passport = require('passport');
quotationRouter.get('/exact', loader.get('quotation/exact'));
quotationRouter.get('/list', loader.get('quotation/list'));
quotationRouter.post('/create', loader.get('quotation/create'));
quotationRouter.delete('/delete/:id', passport.authenticate('jwt', {session: false}), loader.get('quotation/delete'));
quotationRouter.put('/update/:id', passport.authenticate('jwt', {session: false}), loader.get('quotation/update'));
module.exports = quotationRouter;