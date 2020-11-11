const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const questionSchema = new Schema({
    question : {
        type:String,
        required:true,
        // minlength:25
    },
    description : {
        type:String,
        required:true,
        // minlength:100
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref : User,
    }
}, {timestamps:true})

const Question = mongoose.model('Question', questionSchema)

module.exports ={ Question }