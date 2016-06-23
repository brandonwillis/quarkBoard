const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Notes = require('./note');
const Goals = require('./goal');

//Define our model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  notes: [{type: Schema.ObjectId, ref: Notes }],
  goals: [{type: Schema.ObjectId, ref: Goals }]
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      user.password = hash;

      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {

  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  })
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
