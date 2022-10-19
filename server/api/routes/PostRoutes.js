const express = require('express')
const router = express.Router()
const postController = require('../controllers/PostsController')
const authenticateToken = require('../middlewares/Auth')
const validateApi=require('../middlewares/ValidateApi')



router.route('/').get(postController.getAllPosts).post(authenticateToken,validateApi, postController.addPost)
// TODO: Check for following Route
router.route('/users').post(authenticateToken,postController.getPostsByUser)

router
  .route('/:postId')
  .get(postController.getPostById)
  .put(authenticateToken, postController.updatePost)
  .delete(authenticateToken, postController.deletePost)

module.exports = router
