'use strict';

const {Router} = require('express');
const {HttpCode} = require('../../../constants');

const router = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query} = req.query;
    const filteredArticles = searchService.byTitle(query);
    return res.status(HttpCode.OK).json(filteredArticles);
  });
};
