'use strict';

const {HttpCode} = require('../../constants');
const ARTICLE_KEYS = ['title', 'createdDate', 'announce', 'fullText', 'category'];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ARTICLE_KEYS.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
