'use strict'

module.exports = (sequelize, DataTypes) => {
    const dailyLog = sequelize.define('dailyLog', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        companyUid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
        },
        dailyTraffic: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    })
    return dailyLog
}
