'use strict';

const {Router} = require(`express`);
const {getMockData} = require('../../lib/get-mock-data');
const {
  CategoryService,
  ArticleService,
  CommentService,
  SearchService,
} = require('../../data-service');
const categoryRoutes = require('./category-api');
const articleRoutes = require('./article-api');
const searchRoutes = require('./search-api');

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categoryRoutes(app, new CategoryService(mockData));
  articleRoutes(app, new ArticleService(mockData), new CommentService());
  searchRoutes(app, new SearchService(mockData));
})();

module.exports = app;
