'use strict'
const models = require('../models')
const response = require('../libs/response')
exports.list = async function (ctx) {
	let cars = await models.mobilx.car.findAll({
		attributes: ['uid', 'isKorean', 'brand', 'model'],
		where: {
			isActive: true
		}
	})
	response.send(ctx, cars)
}
