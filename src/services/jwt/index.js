const privateKey = require('../../../config').jwtSecret
const jwt = require('jsonwebtoken')

module.exports.sign = (username) =>
  jwt.sign({
    usr: username,
    iat: Date.now()
  }, privateKey)

module.exports.verify = (token) =>
  jwt.verify(token, privateKey)
