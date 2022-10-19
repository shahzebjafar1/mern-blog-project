const AppError = require('../../utils/AppError')

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack
  })
}
const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({











































      message: err.message
    })
  } else {
    res.status(500).json({
      message: 'Something Went Wrong'
    })
  }
}

const handleCastError = err => {
  return new AppError(`Invalid ${err.path} : ${err.value}`, 400)
}

const handleValidationError = err => {
  const error = Object.values(err.errors).map(curr => `${curr.message} `)
  return new AppError(error, 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'error'

  if (process.env.NODE_ENV === 'development') {
    developmentError(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = err

    if (error.name === 'CastError') {
      error = handleCastError(error)
    }
    if (error.name === 'ValidationError') {
      error = handleValidationError(error)
    }
    productionError(error, res)
  }
}
