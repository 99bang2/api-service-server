const models = require('../../models')
const response = require('../../libs/response')
const pCrypto = require('crypto')
function createAk(uid) {
    return pCrypto.randomBytes(16).toString('hex') + String(uid);
}

exports.create = async function (ctx) {
    if(ctx.admin.grade !== 'SUPER') {
        response.forbidden(ctx)
    }
    let _ = ctx.request.body
    let company = await models.mobilx.company.create({
        trafficLimit: _.trafficLimit,
        name: _.name,
        isActive: _.isActive,
        memo: _.memo
    })
    company.apiKey = createAk(company.uid)
    await company.save()
    Object.assign(_.admin, {
        companyUid: company.uid,
        grade: 'COMPANY'
    })
    await models.mobilx.admin.create(_.admin)
    response.send(ctx, company)
}

exports.list = async function (ctx) {
    if(ctx.admin.grade !== 'SUPER') {
        response.forbidden(ctx)
    }
    let _ = ctx.request.query
    let companies = await models.mobilx.company.findAll({
        include:[{
            model: models.mobilx.admin
        }]
    })
    response.send(ctx, companies)
}

exports.read = async function (ctx) {
    let {uid} = ctx.params
    if( ctx.admin.grade !== 'SUPER' && Number(ctx.admin.complexUid) !== Number(uid) ) {
        response.forbidden(ctx)
    }
    let complex = await models.mobilx.company.getByUid(ctx, uid, models)
    response.send(ctx, complex)
}

exports.update = async function (ctx) {
    let {uid} = ctx.params
    if( ctx.admin.grade !== 'SUPER' && Number(ctx.admin.companyUid) !== Number(uid) ) {
        response.forbidden(ctx)
    }
    let _ = ctx.request.body
    let company = await models.mobilx.company.findByPk(uid)
    _.trafficCount = company.trafficCount
    let admin = await models.mobilx.admin.findOne({
        where: {
            companyUid: company.uid
        }
    })
    Object.assign(company, _)
    await company.save()
    Object.assign(admin, _.admin)
    await admin.save()
    response.send(ctx, company)
}

exports.refresh = async function(ctx) {
    let {uid} = ctx.params
    if( ctx.admin.grade !== 'SUPER' && Number(ctx.admin.companyUid) !== Number(uid) ) {
        response.forbidden(ctx)
    }
    let company  = await models.mobilx.company.findByPk(uid)
    company.trafficCount = 0
    await company.save()
    response.send(ctx, company)
}

exports.delete = async function (ctx) {
    if(ctx.admin.grade !== 'SUPER') {
        response.forbidden(ctx)
    }
    let {uid} = ctx.params
    let company = await models.mobilx.company.getByUid(ctx, uid, models)
    await company.destroy()
    response.send(ctx, company)
}

exports.bulkDelete = async function (ctx) {
    if(ctx.admin.grade !== 'SUPER') {
        response.forbidden(ctx)
    }
    let _ = ctx.request.body
    let deleteResult = await models.mobilx.company.destroy({
        where: {
            uid: _.uids
        }
    })
    response.send(ctx, deleteResult)
}
