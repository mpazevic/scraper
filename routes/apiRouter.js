const express = require('express');
const apiController = require('../controllers/apiController.js');

const router = express.Router()

module.exports = router
  .post('/scrape', apiController.scrapeArticles)
  .post('/comment', apiController.postComment)
  .delete('/comment', apiController.delComment)
