const User = require('../models/user')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const generateToken = require('../services/generateToken')
const Joi = require('@hapi/joi')
const Barang = require('../models/barang')
const Transaksi = require('../models/transaksi')
const db = require('../config/db')
const { QueryTypes, Sequelize, SELECT } = require('sequelize')

module.exports = {
    create: async (req, res) => {
        try {
            let { id_user, nama_lengkap, email, username, password } = await req.body
            let userRegisterSchema = Joi.object({
                id_user: Joi.string().guid({ version: 'uuidv4' }),
                nama_lengkap: Joi.string().min(5).required(),
                username: Joi.string().min(5).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: Joi.string().min(6).required()
            })
            let data = { id_user, nama_lengkap, email, username, password }
            const result = userRegisterSchema.validate(data)
            //hash password
            const salt = bcrypt.genSaltSync(10)
            id_user = uuid.v4()
            password = bcrypt.hashSync(password, salt)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.render('registerUser', { success: false })
            } else {
                User.create({
                    id_user, nama_lengkap, email, username, password
                }).then(res.render('registerUser', { success: true }))
            }
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = await req.body
            let user
            let userLoginSchema = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: Joi.string().min(6).required()
            })
            const data = { email, password }
            const result = userLoginSchema.validate(data)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                console.log(error)
            } else {
                User.findOne({
                    where: { email: email }
                }).then(dataValues => {
                    user = dataValues
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
                        res.cookie('id_user', user.id_user)
                        res.cookie('username', user.username)
                        res.cookie('email', user.email)
                        res.cookie('nama_lengkap', user.nama_lengkap)
                        res.cookie('no_hp', user.no_hp)
                        res.cookie('alamat', user.alamat)
                        res.cookie('token', token, { expire: 600000 + Date.now() })
                    }
                    res.redirect(`/user/${user.id_user}`)
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    user: async (req, res) => {
        try {
            const id_user = await req.cookies.id_user
            await User.findOne({
                where: { id_user: id_user }
            }).then(data => {
                let profile = data.dataValues
                res.render('user', { profile })
            })
        } catch (error) {
            console.log(error)
        }
    },
    logout: (req, res) => {

        res.clearCookie("token")
        res.clearCookie("id_user")
        res.clearCookie("username")
        res.clearCookie("email")
        res.clearCookie("nama_lengkap")
        res.clearCookie("no_hp")
        res.clearCookie("alamat")
        res.redirect('/user/login')
    },
    etalase: async (req, res) => {
        try {
            const profile = req.cookies
            await Barang.findAll()
                .then(data => {
                    res.render('user/list_barang', { profile, data })
                })
        } catch (error) {
            console.log(error)
        }
    },
    transaksi: async (req, res) => {
        try {
            const profile = req.cookies
            const transaksi = await db.query(
                `SELECT User.username,Keranjang.jumlah,Barang.nama_barang,Barang.harga_barang,Transaksi.status,Transaksi.tanggal_sewa,Transaksi.tanggal_kembali,Transaksi.pembayaran,Transaksi.kirim_barang FROM Transaksi INNER JOIN User ON Transaksi.id_user = User.id_user INNER JOIN Keranjang ON Transaksi.id_transaksi = keranjang.id_transaksi INNER JOIN Barang ON Keranjang.id_barang = Barang.id_barang WHERE user.id_user='${profile.id_user}'`
                , { type: QueryTypes.SELECT })
            res.render('user/transaksi', { transaksi, profile })
        } catch (error) {
            console.log(error)
        }
    },
    profile: async (req, res) => {
        try {
            const id_user = await req.cookies.id_user
            await User.findOne({
                where: { id_user: id_user }
            }).then(data => {
                let profile = data.dataValues
                res.render('user/profile', { profile })
            })
        } catch (error) {
            console.log(error)
        }
    }
}