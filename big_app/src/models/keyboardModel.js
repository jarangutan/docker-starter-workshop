var mongoose = require('mongoose');

// Setup schema
var keyboardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  switch: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});

// Export Keyboard model
const Keyboard = module.exports = mongoose.model('keyboard', keyboardSchema);


module.exports.get = (callback, limit) => {
  Keyboard.find(callback).limit(limit);
}