'use strict'
const codes = require('../../configs/codes.json')

module.exports = (sequelize, DataTypes) => {
    const evChargeStation = sequelize.define('evChargeStation', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        statNm: {
            type: DataTypes.STRING,
        },
        statId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        addr: {
            type: DataTypes.STRING
        },
        useTime: {
            type: DataTypes.STRING
        },
        busiId: {
            type: DataTypes.STRING,
        },
        busiNm: {
            type: DataTypes.STRING,
        },
        busiCall: {
            type: DataTypes.STRING,
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
        tag: {
            type: DataTypes.JSON
        },
        evType: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        evTypeName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.getDataValue('evType') !== null) {
                    return codes.evType[this.getDataValue('evType')]
                }
            }
        },
        // Todo: 테슬라 슈퍼차저 충전기 상태 일단 보류
        stall: {
            type: DataTypes.INTEGER
        },
        availableStall: {
            type: DataTypes.INTEGER
        },
        info: {
            type: DataTypes.TEXT
        },
        updateTime: {
            type: DataTypes.DATE
        },
        compareName: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })
    evChargeStation.associate = function (models) {
        evChargeStation.hasMany(models.evCharger, {
            foreignKey: 'statId',
            sourceKey: 'statId'
        })
    }

    evChargeStation.search = async (params, models) => {
        let page = params.page ? Number(params.page) : 1
        let limit = params.limit && params.limit <= 1000 ? Number(params.limit) : 1000
        let total = await models.evChargeStation.count()
        let totalPage = parseInt(total / limit) + (total % limit ? 1 : 0)
        let offset = page > totalPage ? 0 : page * limit

        let attributes = [
            'uid',
            'statNm',
            'statId',
            'addr',
            'useTime',
            'busiId',
            'busiNm',
            'busiCall',
            'lat',
            'lon',
            'picture',
            'tag',
            'evTypeName',
            'stall',
            'availableStall',
            'info',
            'updateTime',
        ]
        return {
            rows: await evChargeStation.findAll({
                attributes,
                limit,
                offset,
                include: [{
                    model: models.evCharger
                }]
            }),
            count: total,
            limit,
            page,
            totalPage
        }
    }
    return evChargeStation
}
