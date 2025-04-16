const models = require("../../models")

exports.parkingSiteList = async function(ctx) {
    let _ = ctx.request.query
    ctx.body = await models.carmeleon.parkingSite.search(_, models.carmeleon)
}

exports.evChargeStationList = async function(ctx) {
    let _ = ctx.request.query
    ctx.body = await models.carmeleon.evChargeStation.search(_, models.carmeleon)
}

exports.gasStationList = async function(ctx) {
    let _ = ctx.request.query
    ctx.body = await models.carmeleon.gasStation.search(_, models.carmeleon)
}

exports.carWashList = async function(ctx) {
    let _ = ctx.request.query
    ctx.body = await models.carmeleon.carWash.search(_, models.carmeleon)
}
