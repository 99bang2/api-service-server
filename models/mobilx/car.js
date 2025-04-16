'use strict'
module.exports = (sequelize, DataTypes) => {
    const car = sequelize.define('car', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        isKorean: {
            type: DataTypes.BOOLEAN
        },
        brand: {
            type: DataTypes.STRING
        },
        model: {
            type: DataTypes.STRING
        },
        carType: {
            type: DataTypes.STRING
        },
        shape: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
    }, {
        indexes: [
            {
                fields: ['created_at']
            }
        ],
        timestamps: true,
        paranoid: true,
        underscored: true,
    })

    return car
}
