const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, `Please provide a post title`]
    },
    body: {
      type: String,
      lowercase: true,
      required: [true, 'Please provide a post body']
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'Post Must Belong To a User']
    },
    comments: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comments',
      content: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

postSchema.virtual('comment', {
  ref: 'Comments',
  foreignField: 'post',
  localField: '_id'
})

const Post = mongoose.model('Posts', postSchema)

module.exports = Post
