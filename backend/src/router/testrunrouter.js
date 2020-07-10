const AWS = require('aws-sdk')
const multer = require('multer')
const express = require('express')
const router = new express.Router()
const axios = require('axios')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var deviceFarm = new AWS.DeviceFarm({apiVersion: '2015-06-23', region: 'us-west-2'})
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const TestRun = require('../dbmodels/testrun')
const Project = require('../dbmodels/project')
const path = process.cwd() + '/src/uploads/'
const packageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        
      cb(null, path)
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})
var upload = multer({storage:packageStorage});

router.post('/createTestRun',upload.single('package'), async (req,res) => {
    console.log('**CreateTestRun**');
    // console.log(req.body)
    console.log("--------------------------------------------------------------------------")
    // console.log(req.file.filename)
    // console.log(req.file.path)
    request = JSON.parse(req.body.details)
    //request = req.body //For POSTMAN testing
    const userId = request.userId
    const projectId = request.projectId
    const projectName = request.projectName
    const testRunName =request.testRunName
    const appFileName = request.userId + "_" + req.file.filename
    const appFileType = request.appFileType
    const devicePoolName = request.devicePoolName
    const devicePoolARNs = request.devicePoolARNs
    // const testType = req.body.testType //**Uncomment for dynamic testType
    const testType = 'BUILTIN_FUZZ'

    let project
    project = await Project.findByPk(request.projectId).then()
    const managerId = project.p_manager_email
    let projectARN
    if(project.p_arn == null){
         //Create Project on AWS Device Farm //**Uncomment Later for creating new project
        let projectParams = {
            name:managerId+'_'+projectName,
            defaultJobTimeoutMinutes: 5
        }
        projectARN = await deviceFarm.createProject(projectParams).promise().then(
            function(data){
                console.log(data.project)
                return data.project.arn;
            },
            function (error) {
                console.log("Create Project Failed with Error: ", error);
                res.status(400).json("Create Project Failed with Error: ", error)
            }
        );
        project.p_arn = projectARN
        project.save()
    }
    else {
        projectARN = project.p_arn
        console.log("ARN exists", projectARN)
    }
//    let projectARN = "arn:aws:devicefarm:us-west-2:850122126226:project:de1ce9d8-d17c-4c87-90be-1efc06c19b01" // For testing

    //Create Project Complete

    //MOCK START
        //Create Upload File
    let uploadParams = {
        name: appFileName,
        type: appFileType,
        projectArn: projectARN
    };
    let appUpload = await deviceFarm.createUpload(uploadParams).promise().then(
        function(data){
            return data.upload;
        },
        function(error){
            console.log("App Upload Failed with Error: ", error);
            res.status(400).json("App Upload Failed with Error: ", error)
        }
    );

    let appUploadARN = appUpload.arn;
    let appUploadURL = appUpload.url;
    console.log("App Upload Created with ARN:", appUploadARN);
    //Create Upload Complete
        
    //Upload File using PUT request
    await axios({
        method: 'PUT',
        url: appUploadURL,
        data: fs.readFileSync(req.file.path)
    }).then((response)=>{
        // console.log(response)
        console.log("File Upload Successful")

    }).catch((err) => {
        console.log("File Upload Failed")
    })


    //Check Status of App Upload
    let appUploadStatus = await getUploadStatus(appUploadARN);
    console.log("App Upload status is: ", appUploadStatus);
    while(appUploadStatus !== "SUCCEEDED"){
        await sleep(5000);
        appUploadStatus = await getUploadStatus(appUploadARN);
        console.log("App Upload status is: ", appUploadStatus);
    }

    //Delete Application Package
    await unlinkAsync(req.file.path)
        
    //Create New Device Pool
    
    let devices = '['
    devicePoolARNs.forEach((device)=>{
        devices=devices.concat('"')
        devices=devices.concat(device.toString())
        devices=devices.concat('"')
        devices=devices.concat(",")
        console.log('--------------',devices)
    })
    devices = devices.substring(0,devices.length-1)
    devices = devices.concat(']')
    console.log("--------------------------------",devices)
    let devicePoolRules=[
        {
            "attribute": "ARN", 
            "operator": "IN",
            "value":devices
            // "value": devicePoolARNs //** For Postman Testing
        }
    ]

    let devicePoolParams = {
        projectArn: projectARN,
        name: devicePoolName,
        rules: devicePoolRules
    }

    console.log(devicePoolARNs.toString())

    let devicePoolARN = await deviceFarm.createDevicePool(devicePoolParams).promise().then(
        function(data){
            return data.devicePool.arn; 
        },function(error){
            console.log("Create Device Pool failed with Error: ",error);
            res.status(400).json("Create Device Pool failed with Error: ",error)
        }
    ); 
    console.log("Device Pool created with ARN: ", devicePoolARN);
    //Create New Device Pool Complete


    //Schedule Test Run
    let scheduleRunParams = {
        name: testRunName, 
        devicePoolArn: devicePoolARN, 
        projectArn: projectARN, 
        test: {
        type: testType
        },
        appArn: appUploadARN,
        executionConfiguration: { 
            jobTimeoutMinutes : 5,
        },
    };
    

    let scheduledRun = await deviceFarm.scheduleRun(scheduleRunParams).promise().then(
        function(data){
            return data.run;
        },function(error){
            console.error("Schedule Run failed with Error:", error);
            res.status(400).json("Schedule Run failed with Error:", error)
            return
        }
    );
    //MOCK END


    console.log("Schedule Run Successful: " , scheduledRun);
    
    let scheduledTestRun = {
        tr_arn: scheduledRun.arn,
        tr_name: testRunName,
        tr_type: testType,
        tr_project_name: projectName,
        tr_tester_id: userId,
        tr_platform: scheduledRun.platform,
        tr_status: scheduledRun.status,
        tr_result: scheduledRun.result,
        tr_total_jobs: scheduledRun.totalJobs,
        tr_completed_jobs: scheduledRun.completedJobs,
        tr_device_minutes: scheduledRun.deviceMinutes,
        tr_timeout_minutes: scheduledRun.jobTimeoutMinutes,
        tr_result_url: scheduledRun.parsingResultUrl,
        tr_start_time: scheduledRun.started.toString(),
        tr_manager_id: managerId,
        tr_p_id: projectId
    }

    await TestRun.create(scheduledTestRun).then((data) => {
        // console.log(data)
        res.status(200).json({"message":"Test Run Success"})
    }).catch((err) => {
        console.log(err)
        res.status(400).json(err)
    });
    
})

async function getUploadStatus(uploadARN){
    return await deviceFarm.getUpload({arn: uploadARN}).promise().then(
        function(data){
            return data.upload.status;
        },function(error){
            console.error("Get Upload failed with Error: ", error);
        }
    );
}

router.post('/getRunStatus', (req,res)=>{
    console.log('Inside getRunStatus')
    deviceFarm.getRun({arn:req.body.RUN_ARN},function(err,data){
        if(err)
        {
            console.log(err,err.stack)
            res.status(400).json('Error in getRunStatus for run_arn: '+req.body.RUN_ARN+' err: '+err)
        }
        else{
           console.log(data)
           res.send(data)
        }
    })
})
module.exports = router