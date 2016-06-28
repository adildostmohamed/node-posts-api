var mongoose = require('mongoose');

//Set up Post schema
var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [],
  updated: { type: Date, default: Date.now }
});

//Export Post as mongoose model
module.exports = mongoose.model('Post', postSchema);
