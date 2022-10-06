const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack
  })
}

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack
    })
  } else {
    console.log(err)
    res.status(500).json({
      message: 'Something Went Wrong'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'error'

  if (process.env.NODE_ENV === 'development') {
    developmentError(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    productionError(err, res)
  }
}
