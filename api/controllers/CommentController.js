const Comment = require('../../models/CommentModel')
const AppError = require('../../utils/AppError')

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
    res.status(200).json({
      commentCount: comments?.length,
      data: comments
    })
  } catch (err) {
    next(err)
  }
}

const getCommentByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
    if (!comments) {
      return next(new AppError('No Comment Found', 404))
    }
    res.status(200).json({
      message: `Comments For Post: ${req.params.postId}`,
      commentCount: comments?.length,
      comments: comments
    })
  } catch (err) {
    next(err)
  }
}

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById( req.params.commentId )
    if (!comment) {
      return next(new AppError('No Comment Found', 404))
    }
    res.status(200).json({
      comment: comment
    })
  } catch (err) {
    next(err)
  }
}

const addComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      post: req.body.post,
      author: req.body.author
    })

    res.status(201).json({
      message: 'Comment Added Successfully',
      data: newComment
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { body: req.body.body },
      {
        new: true,
        runValidators: true
      }
    )
    if (!updatedComment) {
      return next(new AppError('No Comment Found', 404))
    }
    res.status(200).json({
      message: 'Comment Updated Successfully',
      data: updatedComment
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const deleteComment = async (req, res, next) => {
  try {
    if (!(await Comment.findByIdAndDelete(req.params.commentId))) {
      return next(new AppError("Comment Doesn't found", 404))
    }
    res.status(200).json({
      message: 'Comment Deleted Successfully'
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { getAllComments, getCommentByPost,getCommentById, addComment, updateComment, deleteComment }
