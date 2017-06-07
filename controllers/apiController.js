//Dependencies
const express = require("express");
const app = express();
const request = require("request");
const cheerio = require("cheerio");
const Articles = require("../models/article.js");
const Comment = require("../models/comment.js");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

module.exports.scrapeArticles = (req, res) => {
  request("https://news.ycombinator.com/", function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);

    // An empty array to save the scraped data
    var articles = [];

    $('.storylink').each((i, element) => {

      let link = $(element).attr("href");
      let headline = $(element).text();

      // Save these results in an object that will later be used to bulkWrite to the page
      articles.push({
        updateOne: {
          filter: {
            headline: headline
          },
          update: {
            link: link
          },
          upsert: true
        }
      });
    });
    Articles.bulkWrite(articles, (error, bulkResult) => {
      if (error) {
        console.log(error)
      } else {
        console.log(bulkResult);
        res.json(bulkResult);
      }
    });
  });
};

module.exports.postComment = (req, res) => {
  let newComment = new Comment(req.body)
  console.log(req.body)
  let articleId = req.body['_article']
  newComment.save((err) => {
    if (err) console.log(err)
    Articles.update({ "_id": articleId }, {$push: { "comments": newComment._id }}, (err, numAffected) => {
      if(err) console.log(err)
      else {
        res.json(newComment)
      }});
  })
}

module.exports.delComment = (req, res) => {
  Comment.deleteOne({ "_id": req.body.commentId}, (err, result) => {
    console.log("Deleted comment " + req.body.commentId)
    console.log(JSON.parse(result))
    res.json(result)
  })
}
