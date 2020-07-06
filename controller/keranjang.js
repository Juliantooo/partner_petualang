const Keranjang = require('../models/keranjang')


module.exports = {
    create: async (req, res) => {
        try {
            let { id_barang, jumlah } = req.body
            Keranjang.create({
                jumlah, id_barang
            }).then(result => {
                res.redirect(`/user/${req.cookies.id_user}/barang`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}