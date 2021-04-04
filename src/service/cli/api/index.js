'use strict';

const {Router} = require(`express`);
const {getMockData} = require('../../lib/get-mock-data');
const {CategoryService, ArticleService, CommentService} = require('../../data-service');
const categoryRoutes = require('./category-api');
const articleRoutes = require('./article-api');

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categoryRoutes(app, new CategoryService(mockData));
  articleRoutes(app, new ArticleService(mockData), new CommentService());
})();

module.exports = app;
