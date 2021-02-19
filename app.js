require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routers = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./tools/rateLimit');
const centralizedErrorHandler = require('./tools/centralizedErrorHandler');
const { PORT, MONGODB_URL } = require('./configurations');

const app = express();

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const whitelist = [
  'http://localhost:8080',
  'https://news-explorer.students.nomoreparties.xyz',
  'http://news-explorer.students.nomoreparties.xyz',
  'https://www.news-explorer.students.nomoreparties.xyz',
  'http://www.news-explorer.students.nomoreparties.xyz',
  'https://konstantinokhlynin.github.io',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
    'credentials',
  ],
  credentials: true,
};

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(cors(corsOptions));
app.use('/', routers);

app.use(errorLogger);
app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT);
