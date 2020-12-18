const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../tools/urlValidator');
const { getArticles, deleteArticle, createArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

router.get('/', auth, getArticles);

router.post('/', auth, celebrate({
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

router.delete('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

module.exports = router;
