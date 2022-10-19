const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')

const DB = process.env.DATABASE_URI?.replace('<password>', process.env.DATABASE_PASSWORD)

const db = mongoose
  .connect(DB, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  })
  .then(con => console.log('DB Connected Successfully'))


module.exports = db
