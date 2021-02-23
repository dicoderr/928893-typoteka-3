'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/`, (req, res) => {
  res.send(req.originalUrl);
});
router.get(`/register`, (req, res) => {
  res.send(req.originalUrl);
});
router.get(`/login`, (req, res) => {
  res.send(req.originalUrl);
});
router.get(`/search`, (req, res) => {
  res.send(req.originalUrl);
});
router.get(`/categories`, (req, res) => {
  res.send(req.originalUrl);
});

module.exports = router;
