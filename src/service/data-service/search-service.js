'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  byTitle(text) {
    if (!text) {
      return this._articles;
    }
    return this._articles.filter(({title}) => title.toLowerCase().includes(text));
  }
}

module.exports = SearchService;
