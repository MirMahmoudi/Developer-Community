const { Question } = require("../models/Question")
const { Comment } = require("../models/Comment")
const moment = require('moment')

const { checkUser } = require('../middleware/middleware');
const { response } = require("express");


const getHomepage = (req, res) => {
    Question.find().populate('user_id',['username','email'])
        .then(result=> {
            let newResult = []
            result.forEach(oneResult => {
                let newResultObj = {
                    question: oneResult.question,
                    description: oneResult.description,
                    user_id: oneResult.user_id,
                    question_id: oneResult._id,
                    createdAt: moment(oneResult.createdAt).format("MMM Do YY")
                }
                newResult.push(newResultObj)
            })
            res.render('index', { newResult })
        })
        .catch(err => console.log(err))
}

const postNewQuestion = (req, res)=>{
    if(req.method === 'GET'){
        res.render('addQuestion',{err:false})
    }
    if(req.method === 'POST'){
        // console.log(res.locals.user, 'here is req.locals.user')
        const question = new Question(req.body)
        question.user_id = res.locals.user
        // console.log(req.body);
        // console.log(res.locals.user, 'het here is question.user');
        question.save()
        .then(result=>res.redirect('/'))
        // .catch(err => console.log(err.errors.title.message))
        .catch(err => res.render('addQuestion', { err : err.errors }))
    }
}

const showOneQuestion = (req, res)=>{
    if (req.method === 'GET') {
        Question.findById({_id: req.params.id }).populate('user_id',['username','email'])
            .then(result => {
                Comment.find({question_id : {$in : [result._id]}}).populate('user_id',['_id','username','email'])
                    .then( comments =>{
                        const auth_id = res.locals.user
                        res.render('showQuestion', { result, comments, auth_id })
                        })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    
    if (req.method === 'POST') {
        const comment = new Comment(req.body);
        comment.user_id = res.locals.user._id
        comment.question_id = req.params.id
        console.log(req.body, req.params.id);
        comment.save()
            .then(() => res.redirect(`/question/${req.params.id}`))
            .catch(err => console.log(err))
    }
}

const updateOneQuestion = (req, res)=>{
    if(req.method === 'GET'){
        Question.findById({_id: req.params.id })
        .then(result=>{
            // console.log(result)
            res.render('editQuestion', { result })
        })
            
        .catch(err => console.log(err))
    }
    if(req.method === 'POST'){
        Question.findByIdAndUpdate({_id: req.params.id})
        .then(result=>{
            result.question = req.body.question
            result.description = req.body.description
            result.save()
            .then( ()=>
                res.redirect('/'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
}
const deleteOneQuestion = (req, res)=>{
    Question.findByIdAndDelete({_id: req.params.id})
        .then(result=> res.redirect('/'))
        .catch(err => console.log(err))
}

const deleteOneComment = (req, res)=>{
    Comment.findByIdAndDelete({_id: req.params.id})
    // .then(result=> res.redirect('/'))
    .then((val) => {
        // console.log(req.params.id, 'from delete of comment');
            res.redirect(`/question/${val.question_id}`)
        })
    .catch(err => console.log(err))
}



module.exports ={
    getHomepage,
    postNewQuestion,
    showOneQuestion,
    updateOneQuestion,
    deleteOneQuestion,
    deleteOneComment
}