const mongoose = require('mongoose');

// making db schema with mongoose
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// first argument is the name of the model on mongo atlas
module.exports = mongoose.model('Posts', PostSchema);
