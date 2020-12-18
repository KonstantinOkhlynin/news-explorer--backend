const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routers = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./tools/rateLimit');
const centralizedErrorHandler = require('./tools/centralizedErrorHandler');

const app = express();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/newsexplorerdb',
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routers);

app.use(errorLogger);
app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT);
