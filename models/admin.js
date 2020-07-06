const Sequelize = require('sequelize')
const db = require('../config/db')

// admin models
const Admin = db.define('admin', {
    id_admin: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        min: 6
    },
    password: {
        type: Sequelize.STRING,
        min: 6
    },
    foto: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = Admin