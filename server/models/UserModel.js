const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, `Please provide a username`],
    match: [/^[a-zA-Z0-9]+$/, 'Please provide a valid username']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'Please provide an email address'],
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
  },
  password: { type: String, minLength: 6, required: [true, 'Please provide a password'] }
})

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12)
  } catch (err) {
    console.log(err)
  }
  next()
})

userSchema.methods.checkPassword = async function (userSignInPass, userOriginalPass) {
  return await bcrypt.compare(userSignInPass, userOriginalPass)
}

const User = mongoose.model('Users', userSchema)

module.exports = User
