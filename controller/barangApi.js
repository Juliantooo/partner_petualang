const Barang = require('../models/barang')
const Joi = require('@hapi/joi')
const { report } = require('../routes/user')
const { response } = require('express')
var date = new Date()

module.exports = {
    create: async (req, res) => {
        try {
            let { nama_barang, harga_barang, stock } = req.body
            parseInt(harga_barang)
            parseInt(stock)
            const barangSchema = Joi.object({
                nama_barang: Joi.string().required(),
                harga_barang: Joi.number().required(),
                stock: Joi.number().required()
            })
            let data = { nama_barang, harga_barang, stock }
            const result = barangSchema.validate(data)
            foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.send('gagal')
                console.log(error)
            } else {
                Barang.create({
                    nama_barang, harga_barang, stock, foto
                }).then((result) => {
                    res.json({ status: 201, msg: 'Berhasil Tambah Barang', data })
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            Barang.destroy({
                where: { id_barang: await req.params.id }
            }).then(console.log('barang berhasil dihapus'))
                .then(result => {
                    if (result == 1) {
                        res.json({ status: 200, msg: 'Berhasil Hapus Barang' })
                    } else {
                        res.json({ status: 401, msg: 'Gagal Hapus, Data tidak ada' })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            let foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            let { nama_barang, harga_barang, stock } = req.body
            let data = { nama_barang, harga_barang, stock, foto }
            Barang.update({
                nama_barang: req.body.nama_barang,
                harga_barang: req.body.harga_barang,
                stock: req.body.stock,
                foto: foto
            }, {
                where: { id_barang: req.params.id }
            }).then(result => {
                if (result == 1) {
                    res.json({ status: 200, msg: 'berhasil Update Barang', data })
                } else {
                    res.json({ status: 401, msg: 'Gagal update , Barang tidak ditemukan' })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    showAll: async (req, res) => {
        try {
            await Barang.findAll()
                .then(data => {
                    res.json(data)
                })
        } catch (error) {
            console.log(error)
        }
    }
}