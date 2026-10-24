const jwt = require('jsonwebtoken')
const User = require('../model/user.model.js')
require('dotenv').config()

module.exports = async function protect(req, res, next) {
  try {

    const token = req.cookies.token
    if(!token) return res.status(401).json({
      message: 'unauthorize access denied'
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('-password')
    
    if(!user) return res.status(401).json({
      message:'User not found in database'
    })

    req.user = user
    
    next()
  } catch (error) {
    res.status(401).json({
      message: 'invalid cookie'
    })
  }
}