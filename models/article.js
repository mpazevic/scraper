//Create an article Schema using the Mongoose ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create an article model with attributable comments
const ArticleSchema = new Schema({
  headline: String,
  link: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
