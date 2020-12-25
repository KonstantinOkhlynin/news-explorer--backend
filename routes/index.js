const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const articlesRoutes = require('./articles');
const usersRoutes = require('./users');
const { createUser, login } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[A-Za-z0-9!@#$%^&*]{8,}$')),
  }),
}), createUser);
router.use('/articles', articlesRoutes);
router.use('/users', usersRoutes);

module.exports = router;
