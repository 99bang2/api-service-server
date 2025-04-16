'use strict'
const Router = require('koa-router')
const api = new Router()
const carmeleonController = require('../controllers/carmeleon')

api.get('/parkingSite', carmeleonController.parkingSiteList)
api.get('/evChargeStation', carmeleonController.evChargeStationList)
api.get('/gasStation', carmeleonController.gasStationList)
api.get('/carWash', carmeleonController.carWashList)


module.exports = api
