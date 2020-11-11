const mongoose = require('mongoose')


const db = "mongodb://localhost/Question"

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(res => console.log('connected to db'))
    .catch(err=> console.log(err))