let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../../api/user/model');
const jwt = require('../jwt');
const privateKey = require('../../../config').jwtSecret

passport.use('password', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
        console.log(user.authenticate(password))
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use('token', new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: privateKey}, function(jwt_payload, done) {
    User.findOne({username: jwt_payload.usr}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports.password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).json(info)
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).json(info)
      next()
    })
  })(req, res, next)


module.exports.token = () => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).json(info)
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).json(info)
      next()
    })
  })(req, res, next)
