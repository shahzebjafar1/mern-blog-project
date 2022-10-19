const express = require('express')
const router = express.Router()
const userController = require('../controllers/UsersControllers')
const authController = require('../controllers/AuthController')
const authenticateToken = require('../middlewares/Auth')
const validateApi=require('../middlewares/ValidateApi')


router.route('/').get( userController.getAllUser).post(validateApi,userController.userSignUp)

router
  .route('/:id')
  .get( userController.getUser)
  .put(authenticateToken, userController.updateUser)
  .delete(authenticateToken, userController.deleteUser)

router.route('/login').post(validateApi,authController.userSignIn)

module.exports = router
