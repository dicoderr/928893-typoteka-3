'use strict';

const {nanoid} = require('nanoid');
const {MAX_ID_LENGTH} = require('../../constants');

class CommentService {
  create(text) {
    return {id: nanoid(MAX_ID_LENGTH), text};
  }
}

module.exports = CommentService;
