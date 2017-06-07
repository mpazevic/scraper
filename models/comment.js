// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  _article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  contents: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
