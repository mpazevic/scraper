// Import the articles model to use its database functions
var Articles = require("../models/article.js");

module.exports.displayIndex = (req, res) => {
  res.render("index", {});
};

module.exports.retrieveArticles = (req, res) => {
  Articles.find({}).limit(20).populate('comments').sort({ _id: -1 }).exec((err, found) => {
    if (err) {
      console.log(err)
    } else {
      console.log(JSON.stringify(found, null, 2))
      res.render("articles", { articles: found })
    }
  })
}
