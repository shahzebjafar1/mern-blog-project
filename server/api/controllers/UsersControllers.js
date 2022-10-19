const User = require('../../models/UserModel')
const AppError = require('../../utils/AppError')
const signToken = require('../../utils/SignJwtToken')

const userSignUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })

    const token = signToken(newUser)
    res.status(201).json({
      message: 'User Added Successfully',
      data: newUser,
      token: token
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      users_count: users.length,
      data: users
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return next(new AppError('User Not Found', 404))
    }

    res.status(200).json({
      message: `Result For User: ${user.id}`,
      data: user
    })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { userName: req.body.userName, email: req.body.email },
      {
        new: true,
        runValidators: true
      }
    )
    if (!user) {
      return next(new AppError('User Not Found', 404))
    }

    res.status(200).json({
      message: 'User Updated Successfully',
      data: user
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    if (!(await User.findByIdAndDelete(req.params.id))) {
      return next(new AppError('User Not Found', 404))
    }
    res.status(200).json({
      message: 'User Deleted Successfully'
    })
  } catch (err) {
    next({ ...err, name: err.name })
  }
}

module.exports = { getAllUser, userSignUp, getUser, updateUser, deleteUser }
