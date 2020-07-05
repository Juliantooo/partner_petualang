const Sequelize = require('sequelize')
const db = require('../config/db')

const Keranjang = db.define('keranjang', {
    id_keranjang: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_transaksi: {
        type: Sequelize.STRING
    },
    id_barang: {
        type: Sequelize.INTEGER
    },
    jumlah: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true
})

module.exports = Keranjang