const { sequelize, DataTypes } = require('../db/conn')
const Receipt = sequelize.define('receipt', {
    r_project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    r_amount: {
        type: DataTypes.FLOAT,
    },

    r_manager_id: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'receipt',
    timestamps: true
})

module.exports = Receipt