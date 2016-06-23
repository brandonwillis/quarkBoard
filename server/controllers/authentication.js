const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  const username = req.body.username;

  User.findOne({ username: username}, function(err, result) {
    if(err) { return next(err); }

    res.send({ token: tokenForUser(req.user), uid: result._id });
  })
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if(!username || !password || !email) {
    return res.status(422).send({ error: 'You must provide a username and password'})
  }

  User.findOne({ username: username }, function(err, existingUser){
    if(err) { return next(err); }

    if(existingUser) {
        return res.status(422).send({ error: 'Username is in use' });
    }

    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save(function(err, result) {
      if(err) { return next(err); }

      res.send({ token: tokenForUser(user), uid: result._id });
    });
  })
}
