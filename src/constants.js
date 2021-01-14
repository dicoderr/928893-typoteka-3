'use strict';

const ExitCode = {
  success: 0,
  error: 1,
};

const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {ExitCode, HttpCode};
