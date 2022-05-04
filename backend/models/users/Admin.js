const Sequelize = require('sequelize');
const db = require('../db/mysql')

const Admin = db.define('Admins',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
// CRIAR TABELA
//AdminUser.sync();

module.exports = Admin