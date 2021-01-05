const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const message = require('./messages');

module.exports = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new BadRequestError(message.urlError);
};
