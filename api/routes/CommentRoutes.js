const express = require('express')
const router = express.Router()
const commentController = require('../controllers/CommentController')
const validateApi = require('../middlewares/ValidateApi')
const authenticateToken = require('../middlewares/Auth')

router
  .route('/:postId/comments')
  .get(commentController.getCommentByPost)
  .post(authenticateToken, validateApi, commentController.addComment)
router
  .route('/:postId/comments/:commentId')
  .get(commentController.getCommentById)
  .put(authenticateToken, commentController.updateComment)
  .delete(authenticateToken, commentController.deleteComment)

module.exports = router
