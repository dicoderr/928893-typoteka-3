'use strict';

const {HttpCode} = require('../../constants');

module.exports = (req, res, next) => {
  const {commentId} = req.params;
  const {article} = res.locals;
  const comment = article.comments.find((c) => c.id === commentId);

  if (!comment) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  res.locals.comment = comment;
  return next();
};
