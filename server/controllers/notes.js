const User = require('../models/user');

exports.fetchNotes = function(req, res, next) {
  console.log("getNotes req :", req.body)
  const userId = req.body.uid;
  User.findOne({ _id: userId}, function(err, result) {
    if(err) { return next(err); }
    console.log("result notes :", result.notes);
    res.send( {notes: result.notes} );
  });
}
