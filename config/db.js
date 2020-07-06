const Sequelize = require('sequelize')

//configure database
const db = new Sequelize('partner_petualang', 'root', '', {
    connectionLimit: 100,
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        evict: 15000,
        idle: 20000
    },
    dialectOptions: {
        connectTimeout: 60000
    }
})

module.exports = db