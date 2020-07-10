const { sequelize, DataTypes } = require('../db/conn')
const Project = sequelize.define('project', {
    p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    p_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    p_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    p_domain: {
        type: DataTypes.STRING
    },
    p_manager_email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    p_estimated_man_hours: {
        type: DataTypes.INTEGER
    },
    p_progress: {
        type: DataTypes.STRING
    },
    p_deadline: {
        type: DataTypes.DATE
    },
    p_developers_required: {
        type: DataTypes.INTEGER
    },
    p_artifacts: {
        type: DataTypes.STRING
    },
    p_skill_req: {
        type: DataTypes.STRING
    },
    p_arn: {
        type: DataTypes.STRING(255)
    }


}, {
    tableName: 'project',
    timestamps: false
})

module.exports = Project









