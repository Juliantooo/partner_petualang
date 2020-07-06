const Sequelize = require('sequelize')
const db = require('../config/db')

const Barang = db.define('barang', {
    id_barang: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nama_barang: {
        type: Sequelize.STRING,
    },
    harga_barang: {
        type: Sequelize.INTEGER
    },
    stock: {
        type: Sequelize.INTEGER
    },
    foto: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = Barang