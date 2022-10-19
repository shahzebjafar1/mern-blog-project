const express = require('express')
const userRoutes = require('./api/routes/UserRoutes')
const postRoutes = require('./api/routes/PostRoutes')
const commentRoutes = require('./api/routes/CommentRoutes')
const globalErrorHandler = require('./api/middlewares/GlobalError')
const AppError = require('./utils/AppError')
const cors = require('cors')
require('./config/DBConnection')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/posts', commentRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find url: '${req.originalUrl}' on this server`, 404))
})

app.use(globalErrorHandler)


app.listen(process.env.PORT, () => {
  console.log('App running at :', process.env.PORT)
})

process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  process.exit(1)
})
