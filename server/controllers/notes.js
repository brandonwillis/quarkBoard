const User = require('../models/user');
const Note = require('../models/note');

exports.fetchNotes = function(req, res) {
  const userId = req.body.uid;
  User.findOne({ _id: userId}, function(err, result) {
    if(err) { return err; }
    const userNotes = result.notes

    Note.find({'_id': { $in: userNotes }}, function(err, result) {
      if(err) { return err }
      res.send({ notes: result})
    })

  });
}

exports.deleteNote = function(req, res) {
  console.log("delete note req: ", req.body)
  const uid = req.body.uid;
  const nid = req.body.nid;

  User.findByIdAndUpdate(uid, { $pull: { 'notes': nid }}, function(err, result) {
    if(err) { return err; }
    const userNotes = result.notes

    Note.find({'_id': { $in: userNotes }}, function(err, result) {
      if(err) { return err }
      res.send({ notes: result})
    })
    
  });
}

exports.addNote = function(req, res, next) {
  const uid = req.body.uid;
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Note({title: title, content: content});

  newNote.save(function(err, result) {

    if(err) { return next(err); }
    console.log("new note saved to db: ", result._id)

    User.findByIdAndUpdate(uid, {$push:{ 'notes': result._id}}, function(err, result) {
        console.log("look at my model: ", result);
        res.send("note added");
      })
  })
}

  //   { $push: { 'notes': { title: title, content: content, date: date }}},
  //    {safe: true, upsert: true, new: true},
  //     function(err, result) {
  //       if(err) { return next(err); }
  //       console.log("note added!", result);
  //       res.send( {notes: result.notes} );
  // });
