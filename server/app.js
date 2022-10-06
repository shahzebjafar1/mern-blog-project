const express = require('express')
const userRoutes = require('./api/routes/userRoutes')
const postRoutes = require('./api/routes/postRoutes')
const commentRoutes = require('./api/routes/commentRoutes')
const globalErrorHandler = require('./api/middlewares/global.error')
const AppError = require('./utils/appError')
const cors = require('cors')
require('./config/DBConnection')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
// app.use('/api/v1/posts', commentRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find url: '${req.originalUrl}' on this server`, 404))
})

app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
  console.log('App running at :', process.env.PORT)
})
