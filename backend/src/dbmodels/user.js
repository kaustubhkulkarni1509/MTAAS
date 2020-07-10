const { sequelize, DataTypes } = require('../db/conn')
const bcrypt = require('bcrypt')
const User = sequelize.define('users', {
    u_first_name: {
        type: DataTypes.STRING,
        
        allowNull: false
    },
    u_last_name: {
        type: DataTypes.STRING,
        
        allowNull: false
    },
    u_email_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    u_password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    u_type: {
        type: DataTypes.STRING
    },
    u_status: {
        type: DataTypes.STRING
    },
    u_phone_number:{
        type: DataTypes.STRING
    }

}, {
    tableName: 'users',
    timestamps: false
})

module.exports = User






  
       
        
                