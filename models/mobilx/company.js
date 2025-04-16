'use strict'
const response = require('../../libs/response')
const codes = require('../../configs/codes.json')

module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apiKey: {
            type: DataTypes.STRING,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
        memo: {
            type: DataTypes.TEXT
        },
        trafficLimit: {
            type: DataTypes.INTEGER
        },
        trafficCount: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })
    company.associate = function (models) {
        company.hasOne(models.admin)
    }
    return company
}
