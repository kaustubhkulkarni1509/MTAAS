const { sequelize, DataTypes, Sequelize } = require('./conn')
const AWS = require('aws-sdk')
var deviceFarm = new AWS.DeviceFarm({ apiVersion: '2015-06-23', region: 'us-west-2' })
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
var CronJob = require('cron').CronJob;

var job = new CronJob('*/5 * * * * *', async function () {





  const data = await sequelize.query("SELECT * FROM " + 'public."testRun"' + " where tr_status != 'COMPLETED'", { type: QueryTypes.SELECT });
  //console.log(data)
  for (i = 0; i < data.length; i++) {
    //console.log(data[i])

    const arninput = data[i].tr_arn
    await deviceFarm.getRun({ arn: arninput }, async function (err, data) {
      if (err) {
        //console.log(err, err.stack)
      }
      else {

        if (data.run.status === 'COMPLETED' && data.run.deviceMinutes != undefined) {

          console.log(data.run.deviceMinutes)
          params = { type: "FILE", arn: arninput };
          deviceFarm.listArtifacts(params, async function (err, data) {
            if (err) {//console.log(err, err.stack);
            }
            else {
              for (i = 0; i < data.artifacts.length; i++) {
                if (data.artifacts[i].type === 'VIDEO')
                  await sequelize.query('Update public."testRun"' + " set tr_video_link = '" + data.artifacts[i].url + "'", { type: QueryTypes.UPDATE });

                //console.log(data.artifacts[i])
              }
            }
          });
          //console.log(data.run)
          await sequelize.query('Update public."testRun"' + " set tr_status = '" + data.run.status + "',tr_result = '" + data.run.result + "',tr_device_minutes=" + data.run.deviceMinutes.total+ ",tr_end_time='" + data.run.stopped + "',tr_total_testcases=" + data.run.counters.total + ",tr_passed_testcases=" + data.run.counters.passed + ",tr_failed_testcases=" + data.run.counters.failed + " WHERE tr_arn = '" + data.run.arn + "'", { type: QueryTypes.UPDATE }).then((result) => {
            // console.log(result)
          }).catch((err) => {
            //console.log(err)
          });
        }
        if (data.run.status === 'COMPLETED' && data.run.deviceMinutes === undefined) {

          params = { type: "FILE", arn: arninput };
          deviceFarm.listArtifacts(params, async function (err, data) {
            if (err) {//console.log(err, err.stack);
            }
            else {
              for (i = 0; i < data.artifacts.length; i++) {
                if (data.artifacts[i].type === 'VIDEO')
                  await sequelize.query('Update public."testRun"' + " set tr_video_link = '" + data.artifacts[i].url + "'", { type: QueryTypes.UPDATE });

                console.log(data.artifacts[i])
              }
            }
          });
          //console.log(data.run)

          await sequelize.query('Update public."testRun"' + " set tr_status = '" + data.run.status + "',tr_result = '" + data.run.result + "',tr_device_minutes=" + 0 + ",tr_end_time='" + data.run.stopped + "',tr_total_testcases=" + data.run.counters.total + ",tr_passed_testcases=" + data.run.counters.passed + ",tr_failed_testcases=" + data.run.counters.failed + " WHERE tr_arn = '" + data.run.arn + "'", { type: QueryTypes.UPDATE }).then((result) => {
            //console.log(result)
          }).catch((err) => {
            //console.log(err)
          });
        }


      }
    });
  }
});
job.start();

