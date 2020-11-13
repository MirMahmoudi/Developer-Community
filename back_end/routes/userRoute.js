const express = require('express')
const router = express.Router()
const moment = require('moment')
const { checkUser } = require('../middleware/middleware');

const questionController = require('../controllers/questionController')
const userController = require('../controllers/userController')



router.all('*', checkUser)
router.get('/', questionController.getHomepage)

router.get('/auth1' ,  userController.login_get)
router.get('/auth2' , userController.signup_get)
router.post('/auth/signup' ,  userController.signup_post)
router.post('/auth/login' ,  userController.login_post)
router.get('/logout' ,  userController.logout_get)
router.get('/sessionUser', (req,res) => res.json({session: req.session.user}));

// getallusers just for test
// router.get('/allUsers' , userController.getAllUsers)

module.exports = router
