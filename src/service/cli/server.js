'use strict';

const chalk = require(`chalk`);
const express = require(`express`);

const {HttpCode} = require(`../../constants.js`);
const postsRoutes = require(`./routes/posts-routes.js`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE = `Not found`;

module.exports = {
  name: `--server`,
  async run(args) {
    const [portArg] = args;
    const port = Number.parseInt(portArg, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.use(`/posts`, postsRoutes);
    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MESSAGE));

    app.listen(port, ()=>{
      console.info(chalk.green(`Принимаю подключения на ${port} порт`));
    }).on(`error`, ()=>{
      console.error(`Ошибка при создании сервера`);
    });
  },
};
