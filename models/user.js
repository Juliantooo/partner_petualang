const Sequelize = require('sequelize')
const db = require('../config/db')

//user models
const User = db.define('user', {
    id_user: {
        type: Sequelize.UUIDV4,
        primaryKey: true
    },
    nama_lengkap: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        min: 6
    },
    email: {
        type: Sequelize.STRING,
        min: 6
    },
    password: {
        type: Sequelize.STRING,
        min: 6
    },
    no_hp: {
        type: Sequelize.NUMBER,
        min: 11,
        max: 12
    },
    alamat: {
        type: Sequelize.TEXT
    },
    foto: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = User