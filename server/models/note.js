const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true }
})

const ModelClass = mongoose.model('note', noteSchema);

module.exports = ModelClass;
