const Sequelize = require('sequelize')

const environment = process.env
const { username, password, hostname, database } = environment
const configuration = {
  connectionLimit: 100,
  host: hostname,
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
const db = new Sequelize(database, username, password, { ...configuration })
console.log({ environment, configuration, db })

module.exports = db
