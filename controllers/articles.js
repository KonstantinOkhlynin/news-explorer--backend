const Article = require('../models/article');
const NotForbiddenError = require('../errors/NotForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id).orFail(new Error('NotValidId'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new NotForbiddenError('Нельзя удалить чужую карточку');
      }
      return res.status(200).send(article);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return next(new NotFoundError(`Карточка с id ${req.params.id} не найдена`));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(`Ошибка валидации id карточки ${req.params.id}`));
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
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Ошибка валидации ${err.message}`));
      }
      return next(err);
    });
};
