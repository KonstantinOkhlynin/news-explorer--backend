/* eslint-disable linebreak-style */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../errors/UrlValidator');
const { getArticles, deleteArticle, createArticle } = require('../controllers/articles');
const { getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((link) => urlValidator(link)),
    image: Joi.string().required().custom((image) => urlValidator(image)),
  }).unknown(true),
}), createArticle);

router.delete('/articles/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

router.get('/users/me', auth, getUser);

module.exports = router;
