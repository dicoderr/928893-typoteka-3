'use strict';

const path = require(`path`);
const fs = require(`fs`).promises;
const MOCKS_PATH = path.resolve(__dirname, `../../../mocks.json`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(MOCKS_PATH, `utf8`);
    data = JSON.parse(fileContent);
  } catch (e) {
    console.log(`Error while generating mocks`, e);
    return Promise.resolve([]);
  }

  return Promise.resolve(data);
};

module.exports = {getMockData};
