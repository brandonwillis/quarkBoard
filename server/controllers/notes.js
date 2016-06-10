const User = require('../models/user');

exports.fetchNotes = function(req, res, next) {
  const userId = req.body.uid;
  User.findOne({ _id: userId}, function(err, result) {
    if(err) { return next(err); }
    console.log("fetchNotes result: ", result);
    res.send( {notes: result.notes} );
  });
}

exports.deleteNote = function(req, res, next) {
  console.log("delete note req: ", req.body)
  const uid = req.body.uid;
  const nid = req.body.nid;
  User.findByIdAndUpdate(uid, { $pull: { 'notes': { "id": nid }}}, function(err, result ) {
    if(err) { return next(err); }
    console.log(result);
    res.send( {notes: result.notes} );
  })
}
