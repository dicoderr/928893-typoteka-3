'use strict';

const articleValidator = require('./article-validator');
const articleExists = require('./article-exists');
const commentValidator = require('./comment-validator');
const commentExists = require('./comment-exists');

module.exports = {articleValidator, articleExists, commentValidator, commentExists};
