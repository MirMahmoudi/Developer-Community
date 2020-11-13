const mongoose = require('mongoose')


const db = "mongodb+srv://alaa:amir123@cluster0.iz8ks.mongodb.net/challenge?retryWrites=true&w=majority"

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(res => console.log('connected to db'))
    .catch(err=> console.log(err))