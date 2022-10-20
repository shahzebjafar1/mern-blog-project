const signToken = require('../../utils/SignJwtToken')
const User = require('../../models/UserModel')
const AppError = require('../../utils/AppError')

const userSignIn = async (req, res, next) => {
  const { email, password } = req.body

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
