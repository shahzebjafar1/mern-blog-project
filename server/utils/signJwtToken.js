const jwt = require('jsonwebtoken')

const signToken = user => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

module.exports = signToken
