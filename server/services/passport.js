const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
  //Verify this username and password, call done with the user
  //If it is the correct username and password
  //Otherwise, call done with false
  User.findOne({ username: username }, function(err, user){
    if (err) { return done(err); }
    if(!user) { return done(null, false); }
    //Compare passwords - is 'password' === user.password?
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      return done(null, user);
    })
  })
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //See if the user ID in the payload exists in our database
  //If it does, call 'done' with that user
  //Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }
    if(user) {
      done(null, user); //let user authenticate
    } else {
      done(null, false);  //user not authenticated
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
