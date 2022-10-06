const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/auth')
const commentController = require('../controllers/commentController')

router
  .route('/:postId/comments')
  .get(commentController.getCommentByPost)
  .post(authenticateToken, commentController.addComment)
router
  .route('/:postId/comments/:commentId')
  .put(authenticateToken, commentController.updateComment)
  .delete(authenticateToken, commentController.deleteComment)

module.exports = router
