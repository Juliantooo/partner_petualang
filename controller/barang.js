const Barang = require('../models/barang')
const Joi = require('@hapi/joi')

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
            console.log(data)
            const result = barangSchema.validate(data)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.send('gagal')
                console.log(error)
            } else {
                Barang.create({
                    nama_barang, harga_barang, stock
                }).then(() => {
                    res.redirect(`/admin/${req.cookies.id_admin}/barang`)
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
                .then(result => res.redirect(`/admin/${req.cookies.id_admin}/barang`))
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            console.log(req.body)
            Barang.update({
                nama_barang: req.body.nama_barang,
                harga_barang: req.body.harga_barang,
                stock: req.body.stock
            }, {
                where: { id_barang: req.params.id }
            }).then(result => res.redirect(`/admin/${req.cookies.id_admin}/barang`))
        } catch (error) {
            console.log(error)
        }
    }
}