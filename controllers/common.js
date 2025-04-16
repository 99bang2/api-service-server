'use strict'
const models = require('../models')
const response = require('../libs/response')
const objectStorage = require('../libs/naverStorage')

exports.createStorageBucket = async function (ctx) {
	let _ = ctx.request.body
	if(!_.bucketName) {
		ctx.badRequest(ctx)
	}
	let result = await objectStorage.create(_.bucketName)
	response.send(ctx, result)
}