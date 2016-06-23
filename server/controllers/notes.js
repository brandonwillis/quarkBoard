const User = require('../models/user');
const Note = require('../models/note');

exports.fetchNotes = function(req, res) {
  const uid = req.body.uid;

  User.findOne({ _id: uid}, function(err, result) {
    if(err) { return err; }
    const userNotes = result.notes;

    Note.find({'_id': { $in: userNotes }}, function(err, result) {
      if(err) { return err }
      const reversedNotes = result.reverse();
      res.send({ notes: reversedNotes })
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
      if(err) { return err; }
    })
  });

  User.findOne({ _id: uid}, function(err, result) {
    if(err) { return err; }
    const userNotes = result.notes;

    Note.find({'_id': { $in: userNotes }}, function(err, result) {
      if(err) { return err; }

      res.send({ notes: result})
    })
  });
}

exports.addNote = function(req, res) {
  const uid = req.body.uid;
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Note({title: title, content: content});

  newNote.save(function(err, result) {
    if(err) { return err; }

    User.findByIdAndUpdate(uid, {$push:{ 'notes': result._id}}, function(err, result) {
      if(err) { return err; }
    })

    User.findOne({ _id: uid}, function(err, result) {
      if(err) { return err; }

      const userNotes = result.notes;

      Note.find({'_id': { $in: userNotes }}, function(err, result) {
        if(err) { return err }

        res.send({ notes: result})
      })
    });
  })
}
