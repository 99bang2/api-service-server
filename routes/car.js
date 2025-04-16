'use strict'
const Router = require('koa-router')
const api = new Router()
const carController = require('../controllers/car')

api.get('/', carController.list)


module.exports = api