'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var config = require('./config');
var db = {};



var onHeroku = !!process.env.DYNO;

var sequelize =  onHeroku ?
    new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true
        }
    })
    :
    new Sequelize(config.db.name, config.db.username, config.db.password, {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql',
        storage: config.db.storage
    });

fs.readdirSync(config.modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(config.modelsDir, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

sequelize
    .sync({ force: config.FORCE_DB_SYNC === 'true' });

module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);