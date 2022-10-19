const Post = require('../../models/PostModel')
const AppError = require('../../utils/AppError')

const addPost = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    })

    res.status(201).json({
      message: 'Post Added Successfully',
      data: newPost
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('comment')
    res.status(200).json({
      posts_count: posts.length,
      posts: posts
    })
  } catch (err) {
    res.status(204).send(err)
  }
}

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comment')
    if (!post) {
      return next(new AppError('Post Not Found', 404))
    }
    res.status(200).json({
      post: post
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.body.userId })
    if (!posts) {
      return next(new AppError('No Post found', 404))
    }
    res.status(200).json({
      posts_count: posts.length,
      posts: posts
    })
  } catch (err) {
    next(err)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        new: true,
        runValidators: true
      }
    )
    if (!updatedPost) {
      return next(new AppError('Post Not Found', 404))
    }
    res.status(200).json({
      message: 'Post Updated Successfully',
      data: updatedPost
    })
  } catch (err) {
    next(err)
  }
}

const deletePost = async (req, res, next) => {
  try {
    if (!(await Post.findByIdAndDelete(req.params.postId))) {
      return next(new AppError('Post Not Found', 404))
    }
    res.status(200).json({
      message: 'Post Deleted Successfully'
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllPosts, getPostById, addPost, updatePost, deletePost, getPostsByUser }
