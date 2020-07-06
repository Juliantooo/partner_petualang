const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const generateToken = require('../services/generateToken')
const uuid = require('uuid')
const Joi = require('@hapi/joi')
const Transaksi = require('../models/transaksi')
const User = require('../models/user')
const Barang = require('../models/barang')
const Keranjang = require('../models/keranjang')
const { QueryTypes, Sequelize, SELECT } = require('sequelize')
const db = require('../config/db')

module.exports = {
    create: async (req, res) => {
        try {
            let { id_admin, email, username, password } = await req.body
            let adminRegisterSchema = Joi.object({
                id_admin: Joi.string().guid({ version: 'uuidv4' }),
                username: Joi.string().min(5).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: Joi.string().min(6).required()
            })
            let data = { id_admin, email, username, password }
            const result = adminRegisterSchema.validate(data)
            // hashing password
            const salt = bcrypt.genSaltSync(10)
            id_admin = uuid.v4()
            password = bcrypt.hashSync(password, salt)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.render('registerAdmin', { success: false })
            } else {
                Admin.create({
                    id_admin, email, username, password
                }).then(res.render('registerAdmin', { success: true }))
            }
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = await req.body
            let admin
            let adminLoginSchema = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: Joi.string().min(6).required()
            })
            const data = { email, password }
            const result = adminLoginSchema.validate(data)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                console.log(error)
            } else {
                Admin.findOne({
                    where: { email: email }
                }).then(dataValues => {
                    admin = dataValues
                    return bcrypt.compare(password, dataValues.password)
                }).then((ress) => {
                    if (ress) {
                        let token
                        token = generateToken()
                        if (ress) {
                            return token
                        }
                    }
                }).then(token => {
                    if (token) {
                        res.cookie('id_admin', admin.id_admin)
                        res.cookie('email', admin.email)
                        res.cookie('username', admin.username)
                        res.cookie('token', token, { expire: 600000 + Date.now() })
                    }
                    res.redirect(`${admin.id_admin}`)
                })
            }
        } catch (err) {
            console.log(err)
        }
    },
    admin: async (req, res) => {
        try {
            const id_admin = await req.cookies.id_admin
            await Admin.findOne({
                where: { id_admin: id_admin }
            }).then(data => {
                let profile = data.dataValues
                res.render('admin/', { profile })
            })
        } catch (error) {
            console.log(error)
        }
    },
    logout: (req, res) => {
        res.clearCookie("token")
        res.clearCookie("id_admin")
        res.clearCookie("username")
        res.clearCookie("email")
        res.redirect('/admin/login')
    },
    transaksi: async (req, res) => {
        try {
            const profile = req.cookies
            const transaksi = await db.query(
                "SELECT User.username,Keranjang.jumlah,Barang.nama_barang,Barang.harga_barang,Transaksi.status,Transaksi.tanggal_sewa,Transaksi.tanggal_kembali,Transaksi.pembayaran,Transaksi.kirim_barang FROM Transaksi INNER JOIN User ON Transaksi.id_user = User.id_user INNER JOIN Keranjang ON Transaksi.id_keranjang = keranjang.id_keranjang INNER JOIN Barang ON Keranjang.id_barang = Barang.id_barang"
                , { type: QueryTypes.SELECT })
            res.render('admin/transaksi', { transaksi, profile })

        } catch (error) {
            console.log(error)
        }
    },
    setting: async (req, res) => {
        try {
            const id_admin = await req.cookies.id_admin
            await Admin.findOne({
                where: { id_admin: id_admin }
            }).then(data => {
                let profile = data.dataValues
                res.render('admin/profile', { profile })
            })
        } catch (error) {
            console.log(error)
        }
    },
    getUsers: async (req, res) => {
        try {
            const profile = req.cookies
            await User.findAll()
                .then(userData => {
                    res.render('admin/users', { profile, userData })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getAllBarang: async (req, res) => {
        try {
            const profile = req.cookies
            await Barang.findAll()
                .then(data => {
                    res.render('admin/list_barang', { profile, data })
                })
        } catch (error) {
            console.log(error)
        }
    }
}