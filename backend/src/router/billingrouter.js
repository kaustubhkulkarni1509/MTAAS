const { sequelize } = require('../db/conn')
const express = require('express')
const router = new express.Router()
const QueryTypes = require('sequelize')
const Bill = require('../dbmodels/bill')
const Receipt = require('../dbmodels/receipt')

router.post('/getBillingDetails', async (req, res) => {
    managerId = req.body.managerId
    let billingDetails = await sequelize.query('SELECT p_id, p_name, p_amount - COALESCE(r_amount,0) AS amount FROM (SELECT p_id, p_name, 0.5 * SUM(tr_device_minutes) AS p_amount FROM public."testRun" INNER JOIN project on p_id = tr_p_id WHERE p_manager_email = ' + "'" + req.body.managerId + "' GROUP BY p_id, p_name) AS Result LEFT JOIN receipt on p_id = r_project_id ;", { model: Bill, mapToModel: true });
    // console.log(billingDetails)
    res.status(200).json(billingDetails)
});

router.post('/createBillReceipt', async (req, res) => {
    request = req.body
    const receipt = await Receipt.findByPk(request.projectId);
    if (receipt === null) {
        let receipt = await Receipt.create({r_project_id: request.projectId, r_amount: request.amount, r_manager_id:request.managerId});
        res.status(200).json(receipt)
    }
    else {
        receipt.r_amount = receipt.r_amount + request.amount;
        await receipt.save()
        res.status(200).json(receipt)

    }
})

router.post('/getbillnameamount', async (req, res) => {
    u_email_id = req.body.u_email_id
    let billingDetails = await sequelize.query("select p_name,r_amount from receipt R inner join project p on P.p_id = R.r_project_id where r_manager_id = '"+u_email_id+"'");
    res.send(billingDetails)
})


module.exports = router