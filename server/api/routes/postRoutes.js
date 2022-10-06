const express = require('express')
const router = express.Router()
const postController = require('../controllers/postsController')
const authenticateToken = require('../middlewares/auth')

router.route('/').get(postController.getAllPosts).post(authenticateToken, postController.addPost)
// TODO: Check for following Route
router.route('/users').post(authenticateToken,postController.getPostsByUser)

router
  .route('/:postId')
  .get(postController.getPostById)
  .put(authenticateToken, postController.updatePost)
  .delete(authenticateToken, postController.deletePost)

module.exports = router
