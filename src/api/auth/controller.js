const jwt = require('../../services/jwt')

module.exports.login = (req, res, next) => {
  res.status(201).json({token: jwt.sign(req.user.username)})
}
