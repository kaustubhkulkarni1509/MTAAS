const { sequelize, DataTypes } = require('../db/conn')
const ProjectApplicationMapping = sequelize.define('projectapplicationmapping', {
    pam_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    p_manager_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    p_tester_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    p_id: {
        type: DataTypes.STRING
    },
    p_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    p_status: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'projectapplicationmapping',
    timestamps: false
})

module.exports = ProjectApplicationMapping









