const Sequielize = require('sequelize')
const db = require('../config/db')
const { Sequelize } = require('sequelize')

//transaksi's models

const Transaksi = db.define('transaksi', {
    id_transaksi: {
        type: Sequielize.INTEGER,
        primaryKey: true
    },
    id_keranjang: {
        type: Sequelize.INTEGER

    },
    id_user: {
        type: Sequielize.STRING
    },
    id_admin: {
        type: Sequielize.STRING
    },
    status: {
        type: Sequielize.STRING
    },
    tanggal_sewa: {
        type: Sequielize.DATE
    },
    tanggal_kembali: {
        type: Sequielize.DATE
    },
    // tgl_pesan:{
    //     type:Sequielize.DATE
    // },
    // tgl_kirim:{
    //     type:Sequielize.DATE
    // },
    pembayaran: {
        type: Sequielize.STRING
    },
    kirim_barang: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = Transaksi