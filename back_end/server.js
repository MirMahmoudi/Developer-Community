const express = require('express')
const app = express()
const qRoute = require('./routes/questionRoute')
const cRoute = require('./routes/commentRoute')
const uRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser');
const moment = require('moment')
const cors = require ('cors')
const bodyParser = require('body-parser')
const session = require('express-session');

// install and use body-parser
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.use(express.json());

/////  require mongoose /////
require('./config/mongoose')

//// use cors
app.use(cors({
    origin : 'http://localhost:3000',
    methods: ['GET' , 'POST' , 'DELETE' , 'UPDATE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials:true,
}))
//// use the session
app.use(session({
    secret: 'keyboard green car',
    resave: false,
    saveUninitialized: false,
  })) 
/////  require router /////
app.use(qRoute)
app.use(cRoute)
app.use(uRoute)



app.listen(9000 , () =>console.log('server is running in 9000'))