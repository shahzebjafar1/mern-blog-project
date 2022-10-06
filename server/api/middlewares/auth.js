const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const AppError = require('../../utils/appError')

const authenticateToken = async (req, res, next) => {

  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('You are Not Logged In. Please Login First', 401))
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {
    return next(new AppError('jwt malformed', 401))
  }
  const freshUser = await User.findById(decodedToken.user._id)
  if (!freshUser) {
    return next(new AppError('Token Belonging to this user, do not exist now', 401))
  }

  req.user = freshUser
  next()
}

module.exports = authenticateToken
