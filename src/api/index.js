const Router = require('express').Router
let auth = require('./auth')
let user = require('./user')

const router = new Router()

//router.use('/users', user)
router.use('/auth', auth)
router.use('/user', user)

module.exports = router
