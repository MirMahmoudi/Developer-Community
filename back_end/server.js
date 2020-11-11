const express = require('express')
const app = express()
const qRoute = require('./routes/questionRoute')
const cRoute = require('./routes/commentRoute')
const uRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser');
const moment = require('moment')


app.use(cookieParser());
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.use(express.json());

/////  require mongoose /////
require('./config/mongoose')

/////  require router /////
app.use(qRoute)
app.use(cRoute)
app.use(uRoute)



app.listen(2020 , () =>console.log('server is running in 2020'))