let User = require('./model')

module.exports.sayHi = (req, res, next) => {res.json({message:'hi'})}

module.exports.create = (req, res, next) => {
  User.create({username: req.body.username, password: req.body.password})
    .then((user) => res.status(201).json(user.view(true)))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'username',
          message: 'username already registered'
        })
      } else {
        next(err)
      }
    })
}
