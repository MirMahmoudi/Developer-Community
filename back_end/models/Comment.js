const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const { Question } = require('./Question')

const commentSchema = new Schema({
    comment : {
        type:String,
        required:true,
        // minlength:25
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref : User
    },
    question_id : {
        type: Schema.Types.ObjectId,
        ref : Question
    }
}, {timestamps:true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }