const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const authRoute = require('./routes/auth.route.js')



const app = express()


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)


module.exports = app;