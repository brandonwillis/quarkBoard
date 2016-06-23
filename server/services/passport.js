const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {

  User.findOne({ username: username }, function(err, user){
    if (err) { return done(err); }
    if(!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    })
  })
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
