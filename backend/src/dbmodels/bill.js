const { sequelize, DataTypes } = require('../db/conn')
const Bill = sequelize.define('bill', {

    b_p_id: {
        type: DataTypes.INTEGER
    },

    b_p_name: {
        type: DataTypes.STRING,
    },

    b_amount: {
        type: DataTypes.FLOAT
    }
})

module.exports = Bill