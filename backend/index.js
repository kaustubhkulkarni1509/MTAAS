const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4001
const userrouter = require('./src/router/userrouter')
const testerrouter = require('./src/router/testerrouter')
const managerrouter = require('./src/router/managerrouter')
const projectrouter = require('./src/router/projectrouter')
const testRunRouter = require('./src/router/testrunrouter')
const paymentrouter = require('./src/router/paymentrouter')
const billingRouter = require('./src/router/billingrouter')
const { sequelize } = require('./src/db/conn')
const cors= require('cors')
const app = express()


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(userrouter)
app.use(testerrouter)
app.use(managerrouter)
app.use(projectrouter)
app.use(testRunRouter)
app.use(paymentrouter)
app.use(billingRouter)

app.listen(port, () => {
    console.log('Server is running at port ', port)
})