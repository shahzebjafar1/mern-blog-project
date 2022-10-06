const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controllers')
const postController=require('../controllers/postsController')
const authController = require('../controllers/authController')
const authenticateToken = require('../middlewares/auth')

router.route('/').get(authenticateToken, userController.getAllUser).post(userController.userSignUp)

router
  .route('/:id')
  .get(authenticateToken, userController.getUser)
  .put(authenticateToken, userController.updateUser)
  .delete(authenticateToken, userController.deleteUser)

router.route('/login').post(authController.userSignIn)
// TODO: Make post request for getPost by User
// router.route('/:userId/posts/').get(postController.getPostsByUser)

module.exports = router
