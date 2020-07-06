const Sequelize = require('sequelize')

//configure database
const db = new Sequelize('partner_petualang', 'razer', '1', {
    host: 'perciachan.xyz',
    dialect: 'mysql'
})

module.exports = db