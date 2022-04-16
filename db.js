require('dotenv').config()
const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    dialect: 'postgres'
}
)