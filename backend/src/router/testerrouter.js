const { sequelize, DataTypes, Sequelize } = require('../db/conn')
const express = require('express')
const Tester = require("../dbmodels/tester")
const bcrypt = require('bcrypt')
const multer = require('multer')
const uploadfile = require('../utils/uploadfile')
const path = require('path');
const User = require("../dbmodels/user")
const Project = require("../dbmodels/project")
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const ProjectApplicationMapping = require("../dbmodels/projectapplicationmapping")
const router = new express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Problem arises for path
        const path = process.cwd() + '/src/uploads/'
        console.log(path)
        cb(null, path);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })
router.post('/updatetesterprofile', upload.single('Resume'), async (req, res, next) => {
    const transaction = await sequelize.transaction()
    try {

        let user = JSON.parse(req.body.details)

        let tester = await Tester.findByPk(user.u_email_id)
        tester = tester.dataValues

        let originalname = " "

        let val = tester.t_resume_link
        if (req.file !== undefined) {
            originalname = req.file.originalname
            val = await uploadfile.upload(req.file.path, originalname, 'mobaaa/resume')
            console.log('resume successfully uploaded:', val)
            await Tester.update({
                t_resume_link: val
            }, {
                where: {
                    t_email_id: user.u_email_id
                }
            })
        }

        User.update({
            u_first_name: user.u_first_name,
            u_last_name: user.u_last_name,
            u_phone_number: user.u_phone_number
        },
            {
                where: {
                    u_email_id: user.u_email_id
                }
            })

        const user1 = await User.findByPk(user.u_email_id)
        const tester1 = await Tester.findByPk(user.u_email_id)

        let profile = {
            "flag": "S",
            "message": "Profile Updated",
            "u_first_name": user1.dataValues.u_first_name,
            "u_last_name": user1.dataValues.u_last_name,
            "u_email_id": user1.dataValues.u_email_id,
            "u_type": user1.dataValues.u_type,
            "u_status": 'active',
            "u_phone_number": user1.dataValues.u_phone_number,
            "t_resume_link": tester1.dataValues.t_resume_link

        }
        res.send(profile)
        await transaction.commit()
    }
    catch (e) {
        const result = {


            "u_first_name": "",
            "u_last_name": "",
            "u_email_id": "",
            "u_password": "",
            "u_type": "",
            "u_status": "",
            "u_phone_number": "",
            "t_resume_link": ""

        }
        console.log(e)
        result.flag = "F"
        result.message = "Profile not updated"
        res.send(result)
    }
})


router.post('/gettesterprofile', async (req, res) => {
    console.log(req.body)
    try {
        let user = await User.findByPk(req.body.u_email_id)
        let tester = await Tester.findByPk(req.body.u_email_id)
        if (user.dataValues.u_type === 'tester') {
            let profile = {
                "u_first_name": user.dataValues.u_first_name,
                "u_last_name": user.dataValues.u_last_name,
                "u_email_id": user.dataValues.u_email_id,
                "u_type": user.dataValues.u_type,
                "u_status": 'active',
                "u_phone_number": user.dataValues.u_phone_number,
                "t_resume_link": tester.dataValues.t_resume_link

            }
            console.log(profile)
            res.status(201).send(profile)

        } else {
            const result = {


                "u_first_name": "",
                "u_last_name": "",
                "u_email_id": "",
                "u_password": "",
                "u_type": "",
                "u_status": "",
                "u_phone_number": "",
                "t_resume_link": ""

            }
            console.log(e)
            result.flag = "F"
            result.message = "Profile not updated"
            res.status(201).send(result)
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})



router.post('/searchproject', async (req, res) => {
    //console.log(req.body.skills)
    console.log(req.body)
    const test = req.body.skills.split(',')
    let string = ""
    var i;
    for (i = 0; i < test.length; i++) {
        if (i === test.length - 1) {
            string = string + "p_skill_req" + " " + "LIKE" + " " + "'%" + test[i] + "%'" + " "
        } else {
            string = string + "p_skill_req" + " " + "LIKE" + " " + "'%" + test[i] + "%'" + " " + "OR" + " "
        }

    }

    const projects = await sequelize.query("SELECT * FROM project where " + "("+string+") and project.p_id NOT IN(select projectapplicationmapping.p_id  from  projectapplicationmapping where projectapplicationmapping.p_tester_id = "+"'"+req.body.t_email_id+ "'"+")", { type: QueryTypes.SELECT });
    console.log(projects)
    res.send(projects)
})

router.post('/applyforproject', async (req, res) => {
    const result = {
        "flag": "",
        "message": ""
    }
    const projectapplicationmapping = req.body
    req.body.p_status ="Applied"
    try {

        console.log(req.body)
        await ProjectApplicationMapping.create(projectapplicationmapping)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        result.flag = "S"
        result.message = "You applied to Project"
        res.send(200, result)
    } catch (e) {
        result.flag = "F"
        result.message = "Unsuccessful"
    }


})

router.post('/getmyproject', async (req, res) => {
    //console.log(req.body.skills)
  

    const projects = await sequelize.query("select * from project P inner join projectapplicationmapping M on P.p_id = M.p_id where p_tester_id = '" + req.body.u_email_id + "' and p_status = 'Approved'");
    
    res.send(projects[0])
})

router.post('/getmyprojectrejected', async (req, res) => {
    //console.log(req.body.skills)
   

    const projects = await sequelize.query("select * from project P inner join projectapplicationmapping M on P.p_id = M.p_id where p_tester_id = '" + req.body.u_email_id + "' and p_status = 'Rejected'");
    
    res.send(projects[0])
})

router.post('/getmyprojectapplied', async (req, res) => {
    //console.log(req.body.skills)
   

    const projects = await sequelize.query("select * from project P inner join projectapplicationmapping M on P.p_id = M.p_id where p_tester_id = '" + req.body.u_email_id + "' and p_status = 'Applied'");
   
    res.send(projects[0])
})


router.post('/getmyprojectnames', async (req, res) => {

    const projects = await sequelize.query("select P.p_name,P.p_id from project P inner join projectapplicationmapping M on P.p_id = M.p_id where p_tester_id = '" + req.body.u_email_id + "' and p_status = 'Approved'");
    
    res.send(projects[0])
})

module.exports = router