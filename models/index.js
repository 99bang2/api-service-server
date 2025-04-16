'use strict'
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const sequelizeConfig = require(__dirname + '/../configs/sequelize.json')[env]

let db = {}

const databases = Object.keys(sequelizeConfig);

for (let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = sequelizeConfig[database];
    db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath)
}

fs
    .readdirSync(__dirname + '/carmeleon')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const model = require(path.join(__dirname + '/carmeleon', file))(db.carmeleon, Sequelize.DataTypes)
        db.carmeleon[model.name] = model
    })

fs
    .readdirSync(__dirname + '/mobilx')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const model = require(path.join(__dirname + '/mobilx', file))(db.mobilx, Sequelize.DataTypes)
        db.mobilx[model.name] = model
    })

Object.keys(db.carmeleon).forEach(modelName => {
    if (db.carmeleon[modelName].associate) {
        db.carmeleon[modelName].associate(db.carmeleon)
    }
})
Object.keys(db.mobilx).forEach(modelName => {
    if (db.mobilx[modelName].associate) {
        db.mobilx[modelName].associate(db.mobilx)
    }
})

Object.keys(db.carmeleon).forEach(modelName => {
    if (db.carmeleon[modelName].applyScope) {
        db.carmeleon[modelName].applyScope(db.carmeleon)
    }
})
Object.keys(db.mobilx).forEach(modelName => {
    if (db.mobilx[modelName].applyScope) {
        db.mobilx[modelName].applyScope(db.mobilx)
    }
})

db.carmeleon = db['carmeleon']
db.mobilx = db['mobilx']
db.Sequelize = Sequelize

module.exports = db
