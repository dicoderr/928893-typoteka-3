'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants.js`);

const DEFAULT_PORT = 3000;
const MOCKS_PATH = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const send = (res, code, msg) => {
  const template = `
    <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>Типотека</title>
      </head>
      <body>${msg}</body>
    </html>`.trim();

  res.statusCode = code;
  res.writeHead(code, {
    'Content-Type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(MOCKS_PATH, `utf8`);
        const mocks = JSON.parse(fileContent);
        const titles = mocks.map(({title}) => `<li>${title}</li>`).join(``);
        send(res, HttpCode.OK, `<ul>${titles}</ul>`);
      } catch (err) {
        send(res, HttpCode.OK, NOT_FOUND_MESSAGE);
      }
      break;
    default:
      send(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [countArg] = args;
    const port = Number.parseInt(countArg, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`);
      }

      return console.info(chalk.green(`Принимаю подключения на ${port} порт`));
    });
  },
};
