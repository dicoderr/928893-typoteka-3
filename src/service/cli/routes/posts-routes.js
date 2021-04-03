'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../../lib/get-mock-data`);

const router = new Router();

router.get(`/`, async (req, res) => {
  try {
    const mocks = await getMockData();
    res.json(mocks);
  } catch (e) {
    res.json([]);
  }
});

module.exports = router;
