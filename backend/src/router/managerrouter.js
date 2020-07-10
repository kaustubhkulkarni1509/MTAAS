const { sequelize, DataTypes, Sequelize } = require('../db/conn')
const express = require('express')
const bcrypt = require('bcrypt')
const multer = require('multer')
const uploadfile = require('../utils/uploadfile')
const path = require('path');
const { QueryTypes } = require('sequelize');
const User = require("../dbmodels/user")
const router = new express.Router()




router.post('/updatemanagerprofile', async (req, res, next) => {
    const result = {
        "flag": "",
        "message": "",
        "u_email_id": "",
        "u_type": ""

    }
    const transaction = await sequelize.transaction()
    try {
        //console.log(req.body)
        let user = req.body
        console.log(user)

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
        result.flag = "S"
        result.message = "Profile Updated"
        res.send(result)
        await transaction.commit()
    }
    catch (e) {
        console.log(e)
        result.flag = "F"
        result.message = "Profile not updated"
        res.send(result)
    }
})


router.post('/getmanagerprofile', async (req, res) => {
    
    console.log(req.body.u_email_id)
    
    try {
        let user = await User.findByPk(req.body.u_email_id)
        console.log(user)
        let profile = {
            "u_first_name": user.dataValues.u_first_name,
            "u_last_name": user.dataValues.u_last_name,
            "u_email_id": user.dataValues.u_email_id,
            "u_type": user.dataValues.u_type,
            "u_status": 'active',
            "u_phone_number": user.dataValues.u_phone_number
        }
        console.log(profile)
        res.status(201).send(profile)


    } catch (e) {
        console.log(e)
        res.status(400).send(profile)
    }
})

router.post('/getpendingrequests', async (req, res) => {

    try {
        // Quotes Problem
        const projects = await sequelize.query("(select pam.pam_id,p.p_id, p.p_description, p.p_domain, p.p_deadline,p.p_artifacts,p.p_skill_req,p.p_name,pam.p_tester_id, u.u_first_name, u.u_last_name,pam.p_status, tester.t_resume_link from project as p join projectapplicationmapping as pam on p.p_id = pam.p_id join users as u on pam.p_tester_id = u.u_email_id join tester on pam.p_tester_id= tester.t_email_id  where p_manager_id = " + "'" + req.body.u_email_id + "' " + "and pam.p_status ='Applied');", { type: QueryTypes.SELECT });
        console.log(projects)
        res.send(projects)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }

})

router.post('/approvependingrequests', async (req, res) => {

    let result = {
        "flag": "",
        "message": ""
    }
    try {
        await sequelize.query("UPDATE projectapplicationmapping SET p_status = '" + req.body.action + "' WHERE pam_id = " + req.body.pam_id, { type: QueryTypes.UPDATE });
        result.flag = "S"
        result.message = "Request " + req.body.action + " Successfully"
        res.send(result)
    } catch (e) {
        result.flag = "F"
        result.message = "Request" + req.body.action + " UnSuccessful"
        res.status(400).send(result)
    }

})

router.post('/managergetmyprojectnames', async (req, res) => {

    const projects = await sequelize.query("select * from project P where p_manager_email = '" + req.body.u_email_id + "'");
    
    res.send(projects[0])
})



module.exports = router