'use strict';

const {nanoid} = require('nanoid');
const {MAX_ID_LENGTH} = require('../../constants');

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...article,
    };
    this._articles.push(newArticle);
    return newArticle;
  }

  delete(id) {
    this._articles = this._articles.filter((article) => article.id !== id);
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  update(id, newArticle) {
    const prev = this._articles.find((article) => article.id === id);
    return Object.assign(prev, newArticle);
  }
}

module.exports = ArticleService;
