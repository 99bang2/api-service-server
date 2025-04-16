'use strict'
const Router = require('koa-router')
const api = new Router()
const auth = require('../libs/auth')
const adminController = require('../controllers/mobilx/admin')
const companyController = require('../controllers/mobilx/company')
const dailyLogController = require('../controllers/mobilx/dailyLog')

api.post('/login', adminController.login)
api.get('/logout', adminController.logout)
api.get('/check', adminController.check)
api.get('/unique/:id', adminController.checkUniqueId) // 아이디 중복체크

api.get('/companies', auth.isAdminLoggedIn, companyController.list)
api.post('/companies', auth.isAdminLoggedIn, companyController.create)
api.put('/companies/:uid', auth.isAdminLoggedIn, companyController.update)
api.put('/refreshTraffic/:uid', auth.isAdminLoggedIn, companyController.refresh)

api.get('/dailyLogs', auth.isAdminLoggedIn, dailyLogController.list)

module.exports = api
