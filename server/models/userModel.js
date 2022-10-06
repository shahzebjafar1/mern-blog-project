const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
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
    unique: true,
    required: [true, 'Please provide a email'],
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
  },
  password: { type: String, minLength: 6, required: [true, 'Please provide a password'] },
  token: { type: String }
})

// mongoose middleware/hooks
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    this.password = await bcrypt.hash(this.password, 12)
  } catch (err) {
    console.log(err)
  }
  next()
})

// instance Method
userSchema.methods.checkPassword = async function (userSignInPass, userOriginalPass) {
  return await bcrypt.compare(userSignInPass, userOriginalPass)
}

userSchema.plugin(uniqueValidator, { message: 'is already used' })

const User = mongoose.model('Users', userSchema)

module.exports = User

// userSchema.pre('save', async function (next) {
//   console.log(this)
//   next()
// })

// userSchema.post('save', async function (doc, next) {
//   console.log(doc.id)
//   next()
// })
