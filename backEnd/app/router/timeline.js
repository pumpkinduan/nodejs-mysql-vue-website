let app = require('express');
let loader = require('../../loader');
let timelineRouter = app.Router();
timelineRouter.post('/create',loader.get('timeline/create'));
timelineRouter.get('/list', loader.get('timeline/list'));
timelineRouter.delete('/delete/:id', loader.get('timeline/delete'));
module.exports = timelineRouter;