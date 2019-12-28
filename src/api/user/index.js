const Router = require('express').Router
const user = require('./controller')
const passport = require('../../services/passport')

const router = new Router()

/**
 * @apiDefine username
 * @apiParam {String{2..32}} username The username of the user.
 */
/**
 * @apiDefine password
 * @apiParam {String{6..128}} password The password of the user.
 */
/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiUse username
 * @apiUse password
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 * @apiExample {curl} Example usage:
 *     curl -d '{"username":"foo", "password":"a safer password"}' localhost:9000/auth
 */
router.get('/',
  passport.token(),
  user.sayHi)

module.exports = router
