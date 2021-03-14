'use strict';

const path = require(`path`);
const fs = require(`fs`).promises;
const {Router} = require(`express`);

const MOCKS_PATH = path.resolve(__dirname, `../../../../mocks.json`);
const router = new Router();

router.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCKS_PATH, `utf8`);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (e) {
    res.json([]);
  }
});

module.exports = router;
