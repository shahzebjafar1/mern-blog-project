const Comment = require('../../models/commentModel')
const AppError = require('../../utils/appError')

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
    res.status(200).json({
      commentCount: comments?.length,
      data: comments
    })
  } catch (err) {
    res.status(404).json({
      error: err?.errors
    })
  }
}

const getCommentByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
    res.status(200).json({
      message: `Comments For Post: ${req.params.postId}`,
      commentCount: comments?.length,
      data: comments
    })
  } catch (error) {
    res.status(404).json(error)
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
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateComment = async (req, res, next) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.postId,
      { body: req.body.body },
      {
        new: true,
        runValidators: false
      }
    )
    res.status(200).json({
      message: 'Comment Updated Successfully',
      data: updateComment
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteComment = async (req, res, next) => {
  try {
    if (!(await Comment.findByIdAndDelete(req.params.postId))) {
      return next(new AppError("Comment Doesn't found", 404))
    }
    res.status(204).json({
      message: 'Comment Deleted Successfully'
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getAllComments, getCommentByPost, addComment, updateComment, deleteComment }
