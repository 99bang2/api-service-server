'use strict'
module.exports = (sequelize, DataTypes) => {
    const parkingSite = sequelize.define('parkingSite', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        siteType: {
            type: DataTypes.INTEGER
        },
        lat: {
            type: DataTypes.DOUBLE
        },
        lon: {
            type: DataTypes.DOUBLE
        },
        parkingLot: {
            type: DataTypes.INTEGER
        },
        tel: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        manager: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        paymentTag: {
            type: DataTypes.JSON
        },
        brandTag: {
            type: DataTypes.JSON
        },
        productTag: {
            type: DataTypes.JSON
        },
        optionTag: {
            type: DataTypes.JSON
        },
        carTag: {
            type: DataTypes.JSON
        },
        price: {
            type: DataTypes.INTEGER
        },
        rate: {
            type: DataTypes.DOUBLE
        },
        address: {
            type: DataTypes.STRING
        },
        info: {
            type: DataTypes.TEXT
        },
        priceInfo: {
            type: DataTypes.TEXT
        },
        timeInfo: {
            type: DataTypes.TEXT
        },
        picture: {
            type: DataTypes.JSON
        },
        operationTime: {
            type: DataTypes.STRING
        },
        accountUid: {
            type: DataTypes.INTEGER
        },
        valetType: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isRecommend: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isBuy: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isRate: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        message: {
            type: DataTypes.TEXT
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })

    parkingSite.search = async (params, models) => {
        let page = params.page ? Number(params.page) : 1
        let limit = params.limit && params.limit <= 1000 ? Number(params.limit) : 1000
        let total = await models.parkingSite.count()
        let totalPage = parseInt(total / limit) + (total % limit ? 1 : 0)
        let offset = page > totalPage ? 0 : page * limit

        let attributes = ['uid', 'name', 'optionTag', 'price', 'priceInfo', 'picture', 'lat', 'lon', 'address', 'operationTime']
        return {
            rows: await parkingSite.findAll({
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

    return parkingSite
}
