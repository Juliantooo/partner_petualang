const Sequelize = require('sequelize')

//configure database
const db = new Sequelize('partner_petualang', 'razer', '1', {
    host: '35.202.123.101',
    dialect: 'mysql',
    port: 3306,
    operatorsAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        evict: 15000,
        idle: 20000
    }
})

module.exports = db