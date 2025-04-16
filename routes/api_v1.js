'use strict'
const Router = require('koa-router')
const api = new Router()
const carRouter = require('./car')
const adminRouter = require('./admin')
const carmeleonRouter = require('./carmeleon')
const soneRouter = require('./sone')
const commonController = require('../controllers/common')
const auth = require('../libs/auth')
const traffic = require('../libs/trafficCheck')

api.use('/admin', adminRouter.routes())
api.use('/carmeleon', auth.isCompanyLoggedIn, traffic.trafficLimit, traffic.dailyLogCount, carmeleonRouter.routes())
api.use('/s-one', auth.isCompanyLoggedIn, soneRouter.routes())

api.use('/cars', carRouter.routes())
api.post('/buckets', commonController.createStorageBucket)
module.exports = api
