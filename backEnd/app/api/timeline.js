const map = new Map();
const { TimelineDao } = require('../dao/timeline');
const { reactToClient } = require('../util/response');
function createOneTimeline(req, res, next) {
    const info = req.body;
    TimelineDao.createOneTimeline(info, function (err, data) {
        reactToClient(res, err, data)
    })
}
function getTimelineList(req, res, next) {
    const { page } = req.query;
    TimelineDao.getTimelineList(page, (err, data) => {
        reactToClient(res, err, data)
    });
}
function deleteOneTimeline(req, res, next) {
    const { id } = req.params;
    TimelineDao.deleteOneTimeline(id, (err, data) => {
        reactToClient(res, err, data)
    });

}
map.set('timeline/create', createOneTimeline);
map.set('timeline/list', getTimelineList);
map.set('timeline/delete', deleteOneTimeline);
module.exports = map;
