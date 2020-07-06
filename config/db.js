const Sequelize = require('sequelize')

const environment = process.env
const configuration = {
  connectionLimit: 100,
  host: '35.202.123.101',
  dialect: 'mysql',
  port: 3306,
  operatorsAlias: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    evict: 15000,
    idle: 20000,
  },
  dialectOptions: {
    connectTimeout: 60000,
  },
}

//configure database
const db = new Sequelize('partner_petualang', 'razer', '1', {
  ...configuration,
})
console.log({ environment, configuration, db })

module.exports = db
