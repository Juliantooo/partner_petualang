const Sequelize = require('sequelize')

//configure database
const db = new Sequelize('partner_petualang', 'razer', '1', {
    host: '35.202.123.101',
    dialect: 'mysql',
    operatorsAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = db