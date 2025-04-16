'use strict'
const Router = require('koa-router')
const api = new Router()
const soneController = require('../controllers/sone')

api.get('/evChargeStations', soneController.list)
api.get('/evChargeStations/realTime', soneController.listRealTime)
api.get('/evChargeStations/:uid', soneController.read)

module.exports = api
