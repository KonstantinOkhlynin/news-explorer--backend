const validator = require('validator');
const { BadRequestError } = require('../errors/BadRequestError');

module.exports = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new BadRequestError('неверный формат Url');
};
