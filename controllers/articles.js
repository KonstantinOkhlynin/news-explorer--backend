const Article = require('../models/article');
const message = require('../tools/messages');
const NotForbiddenError = require('../errors/NotForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getArticles = (req, res, next) => {
  Article.find(req.user._id)
  .then((articles) => { res.send({ articles }); })
  .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).populate('owner').orFail(new Error('NotValidId'))
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new NotForbiddenError(message.dontDelete);
      }
      res.send(article);
      return Article.findByIdAndRemove(article);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return next(new NotFoundError(message.articleNotFound));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(message.validationError));
      }
      return next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(200).send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(message.validationError));
      }
      return next(err);
    });
};
