'use strict';

const {Router} = require('express');
const {HttpCode} = require('../../../constants');

const router = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
  });
};
