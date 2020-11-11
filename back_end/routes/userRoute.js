const express = require('express')
const router = express.Router()
const moment = require('moment')
const { checkUser } = require('../middleware/middleware');

const questionController = require('../controllers/questionController')
const userController = require('../controllers/userController')



router.all('*', checkUser)
router.get('/', questionController.getHomepage)

router.get('/auth', userController.getSignupPage)
router.post('/auth', userController.postSignupPage)
router.get('/auth2', userController.getLoginPage)
router.post('/auth2', userController.postLoginPage)
router.get('/logout', userController.getLogOutPage)

module.exports = router
