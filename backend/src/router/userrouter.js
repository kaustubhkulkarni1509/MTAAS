const { sequelize, DataTypes, Sequelize } = require('../db/conn')
const express = require('express')
const User = require("../dbmodels/user")
const Tester = require("../dbmodels/tester")
const bcrypt = require('bcrypt')
const multer = require('multer')
const uploadfile = require('../utils/uploadfile')
const path = require('path');
const router = new express.Router()

// result object for login and signup
const result = {
    "flag": "",
    "message": "",
    "u_email_id": "",
    "u_type": ""

}
// result object for get profile
let profile = {
    "u_first_name": "",
    "u_last_name": "",
    "u_email_id": "",
    "u_password": "",
    "u_type": "",
    "u_status": "",
    "u_phone_number": "",
    "t_resume_link": ""
}
router.post('/userlogin', async (req, res) => {
    console.log(req.body)
    try {
        let user = await User.findByPk(req.body.u_email_id)
        console.log(user)
        if (user === null) {
            result.flag = 'F'
            result.message = "Please register and then login"
            res.status(201).send(result)
        } else {
            user = user.dataValues
            const checkPassword = await bcrypt.compare(req.body.u_password, user.u_password)
            console.log(checkPassword)
            if (checkPassword === true) {
                result.flag = 'S'
                result.message = "Login successful"
                result.u_email_id = user.u_email_id
                result.u_type = user.u_type
                res.status(201).send(result)
            } else {
                result.flag = 'F'
                result.message = "Please enter correct password"
                result.u_email_id = user.u_email_id
                result.u_type = user.u_type
                res.status(201).send(result)
            }
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

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
router.post('/signup', upload.single('Resume'), async (req, res, next) => {
    let originalname= " "
    const transaction = await sequelize.transaction()
try {
         // Name of the file
    console.log(req.file)
    const user = JSON.parse(req.body.details)
    console.log(user)
    if (user.u_type === 'tester') {
         originalname = req.file.originalname
         console.log(originalname)
    }
        // Check if user is already present
        let u = await User.findOne({
            where: {
                u_email_id: user.u_email_id
            }
        });
        // If user is not already present hash the password, and return success message
        if (u === null) {
            console.log('Creating a new user')
            user.u_password = await bcrypt.hash(user.u_password, 10)
            console.log(user.u_type)
            await User.create(user)
            if (user.u_type === 'tester') {
                console.log('User type: tester')
                const val = await uploadfile.upload(req.file.path, originalname,'mobaaa/resume')
                console.log('resume successfully uploaded:', val)
                const tester = {
                    t_email_id: "",
                    t_resume_link: ""
                }
                tester.t_email_id = user.u_email_id
                tester.t_resume_link = val
                await Tester.create(tester)
                console.log('Tester successfully created')
            }
            result.flag = 'S'
            result.message = "User successfuly created"
            result.u_email_id = user.u_email_id
            result.u_type = user.u_type
            res.status(201).send(result)
        }// If user is  already present hash the password, and return faliure message
        else {
            result.flag = 'F'
            result.message = "User already present"
            result.u_email_id = user.u_email_id
            result.u_type = user.u_type
            res.status(201).send(result)
        }
        await transaction.commit()
    } catch (e) {
       
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/getprofile', async (req, res) => {
    console.log(req.body)
    try {
        let user = await User.findByPk(req.body.u_email_id)
        let tester = await Tester.findByPk(req.body.u_email_id)
        console.log(tester.dataValues)
        console.log(user.dataValues)
        if (user.dataValues.u_type === 'tester') {
            profile = user.dataValues
            profile.t_resume_link = tester.dataValues.t_resume_link
            console.log(profile)
            res.status(201).send(profile)

        } else {
            res.status(201).send(user)
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router