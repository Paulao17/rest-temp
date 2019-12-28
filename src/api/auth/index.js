const Router = require('express').Router
const auth = require('./controller')
const passport = require('../../services/passport')

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiVersion 0.0.1
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiParam {String{2..32}} username The username of the user.
 * @apiParam {String{6..128}} password The password of the user.
 * @apiSuccess (Success 201) {String} token JWT to be passed to other requests.
 * @apiError 401 Invalid credentials.
 * @apiExample {curl} Example usage:
 *     curl -d '{"username":"foo", "password":"a safer password"}' localhost:9000/auth
 */
router.post('/',
  passport.password(),
  auth.login)

module.exports = router
