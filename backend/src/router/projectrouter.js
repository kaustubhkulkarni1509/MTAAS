
const { sequelize, DataTypes, Sequelize } = require('../db/conn')
const express = require('express')
const multer = require('multer')
const uploadfile = require('../utils/uploadfile')
const path = require('path');
const Project = require("../dbmodels/project")
const ProjectArtifactMapping = require("../dbmodels/projectartifactmapping")
const router = new express.Router()
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

let result = {
    "p_id": "",
    "p_description": "",
    "p_domain": "",
    "p_manager_email": "",
    "p_estimated_man_hours": "",
    "p_progress": "",
    "p_deadline": "",
    "p_developers_required": "",
    "p_artifacts": "",
    "p_skill_req": "",
    "flag": "",
    "message": ""

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Problem arises for path
        const path = process.cwd() + '/src/testartifacts/'
        console.log(path)
        cb(null, path);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })
router.post('/createproject', upload.single('TestArtifact'), async (req, res, next) => {
    const transaction = await sequelize.transaction()
    try {
        let val=" "
        let originalname = " "
        let project = JSON.parse(req.body.details)
        let skills = project.p_skill_req.toLowerCase()
        console.log(skills)
        project.p_skill_req = skills
        if (req.file !== undefined) {
            originalname = req.file.originalname
            val = await uploadfile.upload(req.file.path, originalname, 'mobaaa/testartifact')
            console.log('TestArtifact uploaded successfully uploaded:', val)
        }
        project.p_artifacts = val
        let createdproject = await Project.create(project)
        
        if (req.file !== undefined) {
            let projectartifactmapping = {
                "pam_p_id": "",
                "pam_artifact_link": ""
            }
            projectartifactmapping.pam_p_id = createdproject.dataValues.p_id
            projectartifactmapping.pam_artifact_link = val
            ProjectArtifactMapping.create(projectartifactmapping)
            
        }
        await transaction.commit()
        
        result = createdproject.dataValues
        result.flag = 'S'
        result.message = 'Project Successfully Created'
        result.p_artifacts = val
        res.status(201).send(result)
    }
    catch (e) {
        console.log(e)
        result.flag = "F"
        result.message = "Project not created"
        res.send(result)
    }
})

router.post('/getprojectartifacts', async (req, res) => {

    try {
        var result=[]
        const user = await sequelize.query("(Select u_type from users where users.u_email_id = '" + req.body.u_email_id + "')", { type: QueryTypes.SELECT });
        console.log(user[0].u_type)

        if (user[0].u_type === 'manager') {
            const project = await sequelize.query("(Select distinct p_id from projectapplicationmapping where p_manager_id= '" + req.body.u_email_id + "')", { type: QueryTypes.SELECT });
            for (i = 0; i < project.length; i++) {
                console.log(project[i].p_id)

                const userdetails = await sequelize.query("select p.p_id,tr.tr_tester_id,tr.tr_total_testcases,tr.tr_passed_testcases,tr.tr_failed_testcases, p.p_name,p.p_description,p.p_domain,tr.tr_video_link, tr.tr_status,tr.tr_result from project as p join "+'public."testRun"'+" as tr on p.p_id = tr.tr_p_id where p.p_id ='" + project[i].p_id + "'", { type: QueryTypes.SELECT });
                if(userdetails != null) result.push(...userdetails)
            }

            console.log(result)

        } else {
            const project = await sequelize.query("(Select distinct p_id from projectapplicationmapping  where p_tester_id= '" + req.body.u_email_id + "' and p_status = 'Approved')", { type: QueryTypes.SELECT });
            for (i = 0; i < project.length; i++) {
                const userdetails = await sequelize.query("select p.p_id, p.p_name,p.p_description,p.p_domain,tr.tr_video_link, tr.tr_status,tr.tr_result from project as p join "+'public."testRun"'+" as tr on p.p_id = tr.tr_p_id where p.p_id ='" + project[i].p_id + "'", { type: QueryTypes.SELECT });
                if(userdetails != null) result.push(...userdetails)
            }

        }
        res.send(result)
    } catch (e) {
        console.log(e)
    }

})

module.exports = router