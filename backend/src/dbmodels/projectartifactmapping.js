const { sequelize, DataTypes } = require('../db/conn')
const ProjectArtifactMapping = sequelize.define('projectartifactmapping', {
    pam_p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    pam_artifact_link: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }


}, {
    tableName: 'projectartifactmapping',
    timestamps: false
})

module.exports = ProjectArtifactMapping









