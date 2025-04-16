'use strict'
const models = require('../models')
const response = require('../libs/response')
const consola = require('consola')
const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../configs/config.json')[env]
const secret = config.secretKey

exports.getAuth = async (ctx) => {
	if (ctx.request.headers.authorization && ctx.request.headers.authorization.split(' ')[0] === 'Bearer') {
		try{
			let accessToken = ctx.request.headers.authorization.split(' ')[1]
			let authData = await jwt.verify(accessToken, secret)
			return authData
		}catch (e) {
			consola.error(e)
			response.unauthorized(ctx)
		}
	} else {
		return null
	}
}

exports.getCompanyAuth = async (ctx) => {
	if(ctx.request.headers.ak) {
		let ak = ctx.request.headers.ak
		let company = await models.mobilx.company.findOne({
			where: {
				apiKey : ak
			}
		})
		if(company) {
			return company.serverCode ? null : company
		}else {
			return null
		}
	}else {
		return null
	}
}

exports.isAdminLoggedIn = async (ctx, next) => {
	if(!ctx.admin){
		response.unauthorized(ctx)
	}
	await next()
}

exports.isCompanyLoggedIn = async (ctx, next) => {
	if(!ctx.company){
		response.unauthorized(ctx)
	}
	await next()
}

exports.isVendorLoggedIn = async (ctx, next) => {
	if(!ctx.vendor){
		response.unauthorized(ctx)
	}
	await next()
}
