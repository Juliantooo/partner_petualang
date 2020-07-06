const Sequelize = require('sequelize')

//configure database

const configuration = {
    host: '35.202.123.101',
    dialect: 'mysql',
    operatorsAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

console.log({ configuration })
const db = new Sequelize('partner_petualang', 'razer', '1', { configuration })
console.log({ ...configuration, db })
module.exports = db