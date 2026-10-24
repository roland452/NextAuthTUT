const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model.js')


function sendToken(res, userId) {
  const token = jwt.sign(
    {id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d'}
  )

  res.cookie('token',token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
}


//signup controller function
exports.signup = async(req, res) => {
  
  try {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password) return res.status(400).json({ message: 'input cant be empty'})

    if(password.length < 6) return res.status(400).json({
      message: 'password must be 6 characters long'
    })

    const cleanEmail = email.toLowerCase().trim()
    const exist = await User.findOne({ email: cleanEmail })

    if(exist) return res.status(400).json({ message:'email already exist login'})

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: cleanEmail,
      password: hashed
    })

    sendToken(res, user._id)

    res.status(201).json({ user : {
      name: user.name,
      email: user.email
    }})
  } catch (error) {

    res.status(500).json({ message: 'could not sign user up'})
    console.log(error)
  }
}


//login controller function
exports.login = async(req, res) => {

  try {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({
      message: 'email and password required'
    })

    const user = await User.findOne({ 
      email: email.toLowerCase().trim()
    })

    if(!user) return res.status(401).json({
      message: 'invalid user'
    })

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return res.status(401).json({
      message: 'password or email is invalid'
    })

    sendToken(res, user._id)
    res.status(201).json({
      user: { name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error'})
    console.log(error)
  }
}


//protector controller function
exports.me = (req, res) => {
  res.json({
    user : {
      name: req.user.name,
      email: req.user.email
    }
  })
}


//logout controller function
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })

  res.json({message:'logged out'})
}


