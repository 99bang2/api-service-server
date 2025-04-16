const moment = require('moment');
const models = require("../models")
const response = require('../libs/response')

exports.trafficLimit = async (ctx, next) => {
    let company = await models.mobilx.company.findByPk(ctx.company.uid)
    if (company.trafficCount < company.trafficLimit) {
        company.trafficCount += 1
        await company.save()
        await next()
    } else {
        response.limitTraffic(ctx)
    }
}

exports.dailyLogCount = async (ctx, next) => {
    let dailyLog = await models.mobilx.dailyLog.findOne({
        where: {
            companyUid: ctx.company.uid,
            createdAt: {[models.Sequelize.Op.gte]: moment().format('YYYY-MM-DD')}
        }
    })
    if (dailyLog) {
        dailyLog.dailyTraffic += 1
        await dailyLog.save()
    } else {
        await models.mobilx.dailyLog.create({
            companyUid: ctx.company.uid,
            companyName: ctx.company.name,
            dailyTraffic: 1
        })
    }
    await next()
}
