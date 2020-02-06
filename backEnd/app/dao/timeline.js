const { Timeline } = require('../model/Timeline');
const { sequelize } = require('../core/db');
class TimelineDao {
    static createOneTimeline(info, success) {//创建一条时间线
        const timeline = new Timeline();
        timeline.status = info.status;
        timeline.title = info.title;
        timeline.save().then(res => {
            success(false, { msg: '创建成功', success: true });
        }).catch(err => {  console.log(err);success(new global.errs.HttpException()); })
    }
    static getTimelineList(page = 1, success) {
        const pageSize = 5;
        Timeline.findAndCountAll({
            //分页
            order: [["created_at", 'DESC']],
            limit: pageSize,
            offset: pageSize * (page - 1)
        }).then((timelines) => {
            if (timelines.rows.length !== 0) {
                success(false, {
                    data: timelines.rows,
                    meta: {
                        count: timelines.count,
                        pageSize: pageSize,
                        success: true
                    }
                });
            } else {
                success(new global.errs.NotFound('数据为空'));
            }
        }).catch(err => {
            success(new global.errs.HttpException());
            
        })
    }
    static deleteOneTimeline(id, success) {
        Timeline.findByPk(id).then(timeline => {
            if (timeline) {
                timeline.destroy().then(res => {
                    success(false, { msg: '删除成功', success: true })
                });
            } else {
                success(new global.errs.NotFound('数据为空'))
            }
        }).catch(err => {
            console.log(err)
            success(new global.errs.HttpException());
        })
    }
}
module.exports = {
    TimelineDao
};
