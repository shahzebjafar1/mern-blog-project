const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, 'Please provide a comment body']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Posts',
      required: [true, 'Comment Must Belong To a Post']
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'Comment Must Belong To a User']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'userName'
  })
  next()
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment
