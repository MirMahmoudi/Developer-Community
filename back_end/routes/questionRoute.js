const express = require('express')
const router = express.Router()
const moment = require('moment')
const { checkUser } = require('../middleware/middleware');

const questionController = require('../controllers/questionController')
const commentController = require('../controllers/commentController')


router.all('*', checkUser)
router.get('/', questionController.getHomepage)
router.all('/add-question', questionController.postNewQuestion)
router.all('/edit-question/:id', questionController.updateOneQuestion)
router.get('/delete-question/:id', questionController.deleteOneQuestion)
/// this router for question and comment
router.all('/question/:id', questionController.showOneQuestion)


router.get('/delete-comment/:id', commentController.deleteOneComment)


module.exports = router
