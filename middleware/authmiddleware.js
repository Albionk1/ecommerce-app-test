const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'albion secret', (err, decodedToken) => {
      if (err) {
        res.redirect('/login')
      }
      else {
        next()
      }
    })
  }
  else {
    res.redirect('/login')
  }

}



module.exports = requireAuth