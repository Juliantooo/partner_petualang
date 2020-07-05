const admin = require('express').Router()
const controler = require('../controller/admin')
const auth = require('../middleware/auth')
const barangController = require('../controller/barang')

admin.get('/login', (req, res) => {
    res.render('loginAdmin')
})
admin.get('/register', (req, res) => {
    res.render('registerAdmin')
})
admin.get('/tables', auth.adminAuth, (req, res) => { res.render('admin/tables') })
admin.post('/register', controler.create)
admin.post('/login', controler.login)
admin.get('/logout', controler.logout)
admin.get('/:id', auth.adminAuth, controler.admin)
admin.get('/:id/transaksi', auth.adminAuth, controler.transaksi)
admin.get('/:id/profile', auth.adminAuth, controler.setting)
admin.get('/:id/users', auth.adminAuth, controler.getUsers)
admin.post('/:id/barang', auth.adminAuth, barangController.create)
admin.get('/:id/barang', auth.adminAuth, controler.getAllBarang)
admin.post('/:id/barang/:id', auth.adminAuth, barangController.delete)
admin.post('/:id/barang/update/:id', auth.adminAuth, barangController.update)

module.exports = admin