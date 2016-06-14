const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  goal: { type: String, required: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: String, required: true }
})

const ModelClass = mongoose.model('goal', goalSchema);

module.exports = ModelClass;
