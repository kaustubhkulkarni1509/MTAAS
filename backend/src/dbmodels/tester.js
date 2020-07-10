const { sequelize, DataTypes } = require('../db/conn')
//const bcrypt = require('bcrypt')
const Tester = sequelize.define('tester', {

    t_email_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    t_resume_link: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {
    tableName: 'tester',
    timestamps: false
})

module.exports = Tester