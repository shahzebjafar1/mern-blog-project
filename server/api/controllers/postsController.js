const Post = require('../../models/postModel')
const AppError = require('../../utils/appError')

const addPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    })

    res.status(200).json({
      message: 'Post Added',
      data: newPost
    })
  } catch (err) {
    res.status(400).json({
      error: err?.errors
    })
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
    res.status(404).json({
      error: err?.errors
    })
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comment')
    res.status(200).json({
      post: post
    })
  } catch (err) {
    res.status(404).json({
      error: err?.errors
    })
  }
}

const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.body.userId })
    console.log(posts)

    res.status(200).json({
      posts_count: posts.length,
      posts: posts
    })
  } catch (err) {
    res.status(404).json({
      message: 'Post not found'
    })
  }
}

const updatePost = async (req, res) => {
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
    res.status(200).json({
      message: 'Post Updated Successfully',
      data: updatedPost
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

const deletePost = async (req, res) => {
  try {
    if (!(await Post.findByIdAndDelete(req.params.postId))) {
      throw new Error("Post Doesn't found")
    }
    res.status(204).json({
      message: 'Post Deleted Successfully'
    })
  } catch (err) {
    res.status(404).json({
      error: err.message
    })
  }
}

module.exports = { getAllPosts, getPostById, addPost, updatePost, deletePost, getPostsByUser }
