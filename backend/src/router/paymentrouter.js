const { sequelize, DataTypes, Sequelize } = require('../db/conn')
const express = require('express')
const router = new express.Router()
const stripe = require('stripe')
const uuid = require('uuid')


router.post('/checkout', async (req, res, next) => {
    let error
    let status
    try {
        console.log(req.body)
        const{product,token} = req.body
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        let final_charge
        const charge = await stripe.charges.create(
            {
                amount:product.price*100,
                currency:"usd",
                customer:customer.id,
                receipt_email:token.email,
                description:"Stripe payment",

            },
            function(err, charge) {
                // asynchronously called
                status="success"
                final_charge=charge
                res.send({error,status,final_charge})
            }
        )
        
        
    }
    catch (e) {
        console.log(e)
        status="failure"
        res.send({error,status})
    }
    
})

module.exports = router