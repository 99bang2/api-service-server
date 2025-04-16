'use strict'
const response = require('../../libs/response')
const codes = require('../../configs/codes.json')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = (sequelize, DataTypes) => {
    const carWash = sequelize.define('carWash', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        carWashName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carWashIndustry: {
            type: DataTypes.STRING
        },
        carWashType: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        closedDay: {
            type: DataTypes.STRING,
        },
        weekdayOperOpenHhmm: {
            type: DataTypes.STRING
        },
        weekdayOperCloseHhmm: {
            type: DataTypes.STRING
        },
        holidayOperOpenHhmm: {
            type: DataTypes.STRING
        },
        holidayOperCloseHhmm: {
            type: DataTypes.STRING
        },
        carWashChargeInfo: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.DOUBLE
        },
        lon: {
            type: DataTypes.DOUBLE
        },
        picture: {
            type: DataTypes.JSON
        },
        typeTag: {
            type: DataTypes.JSON
        },
        typeTagName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('typeTag') !== null) {
                    if (typeof this.getDataValue('typeTag') !== 'undefined') {
                        return this.getDataValue('typeTag').map(function (obj) {
                            return codes.carWashTypeTag[obj]
                        })
                    }
                    return null
                }
            }
        },
        timeTag: {
            type: DataTypes.JSON
        },
        timeTagName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('timeTag') !== null) {
                    if (typeof this.getDataValue('timeTag') !== 'undefined') {
                        return this.getDataValue('timeTag').map(function (obj) {
                            return codes.carWashTimeTag[obj]
                        })
                    }
                    return null
                }
            }
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })

    carWash.search = async (params, models) => {
        let page = params.page ? Number(params.page) : 1
        let limit = params.limit && params.limit <= 1000 ? Number(params.limit) : 1000
        let total = await models.carWash.count()
        let totalPage = parseInt(total / limit) + (total % limit ? 1 : 0)
        let offset = page > totalPage ? 0 : page * limit

        let attributes = [
            'uid',
            'carWashName',
            'carWashType',
            'address',
            'closedDay',
            'weekdayOperOpenHhmm',
            'weekdayOperCloseHhmm',
            'holidayOperOpenHhmm',
            'holidayOperCloseHhmm',
            'carWashChargeInfo',
            'phoneNumber',
            'lat',
            'lon',
            'picture'
        ]
        return {
            rows: await carWash.findAll({
                attributes,
                limit,
                offset
            }),
            count: total,
            limit,
            page,
            totalPage
        }
    }

    return carWash
}
