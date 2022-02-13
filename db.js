require('dotenv').config()
const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    "postgres://postgres:postgres@localhost/gql", {
    dialect: 'postgres'
}

//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port:process.env.DB_PORT
//     }
// )
// const sequelize = new Sequelize("postgres://postgres:postgres@localhost/gql", {
//   dialect: 'postgres'
//   // anything else you want to pass
// })