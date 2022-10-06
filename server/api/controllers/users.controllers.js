const User = require('../../models/userModel')
const AppError = require('../../utils/appError')
const signToken = require('../../utils/signJwtToken')

const userSignUp = async (req, res) => {
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })

    const token = signToken(newUser)
    res.status(201).json({
      message: 'User Added',
      data: newUser,
      token: token
    })
  } catch (err) {
    res.status(400).json({
      error: err?.errors
    })
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
    res.status(404).json({
      status: 'fail',
      error: err?.errors
    })
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({
      message: `Result For User: ${user.id}`,
      data: user
    })

    if (!user) {
      return new AppError('User Not Found', 404)
    }
  } catch (err) {
    res.status(404).json({
      message: 'User not found'
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { userName: req.body.userName, email: req.body.email },
      {
        new: true,
        runValidators: false
      }
    )
    res.status(200).json({
      message: 'User Updated Successfully',
      data: user
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!(await User.findByIdAndDelete(req.params.id))) {
      throw new Error("User Doesn't found")
    }
    res.status(204).json({
      message: 'User Deleted Successfully'
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllUser, userSignUp, getUser, updateUser, deleteUser }
