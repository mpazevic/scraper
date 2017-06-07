const express = require('express');
const apiController = require('../controllers/apiController.js');

const router = express.Router()

module.exports = router
  .get('/all', apiController.getArticle)
  .get('/comments', apiController.getComments)
  .post('/scrape', apiController.scrapeArticles)
  .post('/comment', apiController.postComment)
  .delete('/comment', apiController.delComment)
