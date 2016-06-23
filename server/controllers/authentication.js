const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  //User has already had their username and password auth'd
  //We just need to give them a token
  const username = req.body.username;
  User.findOne({ username: username}, function(err, result) {
    if(err) { return next(err); }
    res.send({ token: tokenForUser(req.user), uid: result._id });
  })
}

exports.signup = function(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if(!username || !password || !email) {
    return res.status(422).send({ error: 'You must provide a username and password'})
  }

  //See if a user with the given username exists
  User.findOne({ username: username }, function(err, existingUser){
    if(err) { return next(err); }

    //If a user with username does exist, return an Error
    if(existingUser) {
        return res.status(422).send({ error: 'username is in use' });
    }

    //If a user with username does NOT exist, create and save user record
    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save(function(err, result) {   //saves record to database
      if(err) { return next(err); }
      //Respond to request indicating user was created
      res.send({ token: tokenForUser(user), uid: result._id });
    });
  })
}
