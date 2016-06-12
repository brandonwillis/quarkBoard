const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Notes = require('./note');

//Define our model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  notes: [{type: Schema.ObjectId, ref: Notes }]
});

//On Save Hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function(next) {
  //Get access to the user model
  const user = this;

  //Generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    //Hash(encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      //Overwrite plain text password with encrypted password
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

//Create the model class
const ModelClass = mongoose.model('user', userSchema);
  //loads the schema into mongoose

//Export the model
module.exports = ModelClass;
