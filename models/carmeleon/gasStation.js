'use strict'
const response = require('../../libs/response')
const codes = require('../../configs/codes.json')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = (sequelize, DataTypes) => {
    const gasStation = sequelize.define('gasStation', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        gasStationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gasStationUid: {
            type: DataTypes.STRING
        },
        brandCode: {
            type: DataTypes.STRING
        },
        brandCodeName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('brandCode') !== null) {
                    return codes.brandCodeOpts[this.getDataValue('brandCode')]
                }
            }
        },
        gasStationType: {
            type: DataTypes.STRING,
        },
        gasStationTypeName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('gasStationType') !== null) {
                    return codes.gasStationTypeOpts[this.getDataValue('gasStationType')]
                }
            }
        },
        address: {
            type: DataTypes.STRING
        },
        tel: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.DOUBLE
        },
        lon: {
            type: DataTypes.DOUBLE
        },
        tag: {
            type: DataTypes.JSON
        },
        tagName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('tag') !== null) {
                    return this.getDataValue('tag').map(function (obj) {
                        return codes.gasStationTag[obj]
                    })
                }
            }
        },
        Gasoline: {
            type: DataTypes.INTEGER
        },
        Diesel: {
            type: DataTypes.INTEGER
        },
        PremiumGasoline: {
            type: DataTypes.INTEGER
        },
        HeatingOil: {
            type: DataTypes.INTEGER
        },
        lpg: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })
    gasStation.search = async (params, models) => {
        let page = params.page ? Number(params.page) : 1
        let limit = params.limit && params.limit <= 1000 ? Number(params.limit) : 1000
        let total = await models.gasStation.count()
        let totalPage = parseInt(total / limit) + (total % limit ? 1 : 0)
        let offset = page > totalPage ? 0 : page * limit

        let attributes = [
            'uid',
            'gasStationName',
            'gasStationUid',
            'brandCodeName',
            'address',
            'tel',
            'lat',
            'lon',
            'tag',
            'tagName',
            'Gasoline',
            'Diesel',
            'PremiumGasoline',
            'HeatingOil',
            'lpg',
        ]
        return {
            rows: await gasStation.findAll({
                attributes,
                limit,
                offset,
            }),
            count: total,
            limit,
            page,
            totalPage
        }
    }
    return gasStation
}
