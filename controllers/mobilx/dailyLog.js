const models = require('../../models')
const response = require('../../libs/response')


exports.list = async function (ctx) {
    if(ctx.admin.grade !== 'SUPER') {
        response.forbidden(ctx)
    }
    let _ = ctx.request.query
    let dailyLogs = await models.mobilx.dailyLog.findAll({
        order: [
            ['created_at', 'DESC'],
            ]
    })
    response.send(ctx, dailyLogs)
}
