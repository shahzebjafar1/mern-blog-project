const signToken = require('../../utils/signJwtToken')
const User = require('../../models/userModel')
const AppError = require('../../utils/appError')

const userSignIn = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please Provide Both Email and Password', 400))
  }

  try {
    const user = await User.findOne({ email })

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError('Incorrect Email or Password', 401))
    }

    const token = signToken(user)
    res.status(200).json({
      message: 'Login Successfully',
      token: token
    })
  } catch (err) {}
}

module.exports = { userSignIn }
