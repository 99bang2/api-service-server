const models = require("../../models")
const response = require('../../libs/response')
const moment = require('moment')
exports.list = async function (ctx) {
    let where = {}
    let attributes = ['uid', 'statNm', 'addr', 'useTime', 'busiNm', 'busiCall', 'lat', 'lon', 'tag', 'evType', 'stall', 'availableStall', 'info', 'updatedAt']
    let include = [{
        model: models.carmeleon.evCharger,
        attributes: ['stat']
    }]
    let evChargeStations = await models.carmeleon.evChargeStation.findAll({include, attributes, where})
    response.send(ctx, evChargeStations)
}

exports.listRealTime = async function (ctx) {
    let _ = ctx.request.query
    let longitude = _.lon ? parseFloat(_.lon) : '126.9783882'
    let latitude = _.lat ? parseFloat(_.lat) : '37.5666103'
    let radius = _.radius && _.radius <=10 ? _.radius : 10
    let where = {}
    let distanceQuery = models.carmeleon.where(models.carmeleon.literal(`(6371 * acos(cos(radians(${latitude})) * cos(radians(lat)) * cos(radians(lon) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(lat))))`), '<=', radius)
    where = [distanceQuery]
    let attributes = ['uid', 'statNm', 'addr', 'useTime', 'busiNm', 'busiCall', 'lat', 'lon', 'tag', 'evType', 'stall', 'availableStall', 'info', 'updatedAt']
    let include = [{
        model: models.carmeleon.evCharger,
        attributes: ['stat']
    }]
    let evChargeStations = await models.carmeleon.evChargeStation.findAll({include, attributes, where})
    response.send(ctx, evChargeStations)
}

exports.read = async function (ctx) {
    let {uid} = ctx.params
    let evChargeStation = await models.carmeleon.evChargeStation.findByPk(uid, {
        include: [{
            model: models.carmeleon.evCharger,
            attributes: ['uid', 'stat', 'chgerType','statUpdDt', 'powerType']
        }],
        attributes: ['uid', 'statNm', 'addr', 'useTime', 'busiNm', 'busiCall', 'lat', 'lon', 'tag', 'evType', 'stall', 'availableStall', 'info', 'updatedAt']
    })
    response.send(ctx, evChargeStation)
}
