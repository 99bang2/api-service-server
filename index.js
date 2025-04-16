'use strict'
const env						 = process.env.NODE_ENV || 'development'
const config					 = require(__dirname + '/configs/config.json')[env]
const consola					 = require('consola')
const koa						 = require('koa')
const Router					 = require('koa-router')
const koaBody					 = require('koa-body')
const cors						 = require('koa2-cors')
const { koaSwagger } 			 = require('koa2-swagger-ui')
const yamljs 					 = require('yamljs')
const scheduler				     = require('node-schedule')
const response 					 = require('./libs/response')
const apiV1Router 				 = require('./routes/api_v1')
const models 					 = require('./models')
const app 						 = new koa()
const router 					 = new Router()
const spec						 = yamljs.load('./openApi.yaml')

router.use('/api', response.res, apiV1Router.routes())
router.get('/docs', koaSwagger({routePrefix: false, swaggerOptions: {spec}}))

app.use(cors())
app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

models.carmeleon.sync().then(function () {
	console.log('carmeleon DB connect')
	models.mobilx.sync().then(function() {
		console.log('mobilx DB connect')
		app.listen(config.listenPort, async() => {
			consola.ready({
				message: `Server listening on ${config.listenPort}`,
				badge: true
			})

			let superAdmin = await models.mobilx.admin.getById('admin', models.mobilx)
			if(!superAdmin) {
				models.mobilx.admin.create({
					id		 : 'admin',
					password : 'admin',
					name	 : '최고관리자',
					isActive : true,
					grade 	 : 'SUPER'
				})
			}
		})
		scheduler.scheduleJob('0 0 0 * * ?', async () => {
			consola.info('CLEAR DAILY TRAFFIC')
			await models.mobilx.company.update({
				trafficCount: 0
			}, {
				where: {
					isActive: true
				}
			})
			consola.info('CREATE DAILY LOG')
			let companyList = await models.mobilx.company.findAll()
			companyList.map(async company => {
				await models.mobilx.dailyLog.create({
					companyUid : company.uid,
					companyName: company.name,
					dailyTraffic: 0
				},{
					where: {
						isActive: true
					}
				})
			})
		})
	})
})
