const { sequelize, DataTypes } = require('../db/conn')
const TestRun = sequelize.define('testRun', {

    tr_arn: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    tr_project_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    tr_tester_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    tr_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tr_type: {
        type: DataTypes.STRING
    },

    tr_platform: {
        type: DataTypes.STRING
    },

    tr_status: {
        type: DataTypes.STRING
    },

    tr_result: {
        type: DataTypes.STRING
    },

    tr_total_jobs: {
        type: DataTypes.INTEGER
    },

    tr_completed_jobs: {
        type: DataTypes.INTEGER
    },

    tr_device_minutes: {
        type: DataTypes.FLOAT
    },

    tr_timeout_minutes: {
        type: DataTypes.FLOAT
    },

    tr_result_url: {
        type: DataTypes.STRING
    },

    tr_start_time: {
        type: DataTypes.STRING
    },

    tr_end_time: {
        type: DataTypes.STRING
    },

    tr_p_id: {
        type: DataTypes.INTEGER
    },

    tr_manager_id: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'testRun',
    timestamps: false
})

module.exports = TestRun