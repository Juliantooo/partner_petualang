const user = require('express').Router()
const controller = require('../controller/user')
const auth = require('../middleware/auth')

user.get('/register', (req, res) => { res.render('registerUser') })
user.post('/register', controller.create)
user.get('/login', (req, res) => { res.render('loginUser') })
user.post('/login', controller.login)
user.get('/logout', controller.logout)
user.get('/:id', auth.userAuth, controller.user)
user.get('/:id/barang', auth.userAuth, controller.etalase)
user.get('/:id/transaksi', auth.userAuth, controller.transaksi)
user.get('/:id/profile', auth.userAuth, controller.profile)

module.exports = user