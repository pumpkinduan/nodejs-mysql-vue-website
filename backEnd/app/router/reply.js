let app = require('express');
let loader = require('../../loader');
let replyRouter = app.Router();// return a mini-app 
replyRouter.post('/create',loader.get('reply/create'));
replyRouter.get('/all', loader.get('reply/all'));
replyRouter.delete('/delete/:id', loader.get('reply/delete'));
module.exports = replyRouter