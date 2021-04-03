'use strict';

const {Router} = require(`express`);
const {getMockData} = require('../../lib/get-mock-data');
const {CategoryService} = require('../../data-service');
const categoryRoutes = require('./category');

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categoryRoutes(app, new CategoryService(mockData));
})();

module.exports = app;
