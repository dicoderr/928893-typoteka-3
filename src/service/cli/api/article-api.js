'use strict';

const {Router} = require('express');
const {HttpCode} = require('../../../constants');
const {
  articleValidator,
  articleExists,
  commentValidator,
  commentExists,
} = require(`../../middlewares`);

const router = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, router);

  router.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).json(articles);
  });

  router.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`not found ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  router.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).json(article);
  });

  router.put(`/:articleId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;

    const modifiedArticle = Object.keys(req.body).reduce((acc, key) => {
      if (article[key]) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});
    const newArticle = articleService.update(article.id, modifiedArticle);

    return res.status(HttpCode.OK).json(newArticle);
  });

  router.delete(`/:articleId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    articleService.delete(article.id);
    return res.status(HttpCode.OK).json(article);
  });

  router.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    return res.json(article.comments);
  });

  router.post(
    `/:articleId/comments`,
    [articleExists(articleService), commentValidator],
    (req, res) => {
      const {text} = req.body;
      const {article} = res.locals;

      const newComment = commentService.create(text);
      const comments = [...article.comments, newComment];
      articleService.update(article.id, {comments});

      return res.status(HttpCode.OK).json(newComment);
    },
  );

  router.delete(
    `/:articleId/comments/:commentId`,
    [articleExists(articleService), commentExists],
    (req, res) => {
      const {article, comment} = res.locals;
      const comments = article.comments.filter((c) => c !== comment);
      articleService.update(article.id, {comments});

      return res.status(HttpCode.OK).send(`Successfully delete comment ${comment.id}`);
    },
  );
};
