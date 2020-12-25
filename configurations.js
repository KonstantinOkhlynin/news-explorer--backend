const { NODE_ENV, MONGODB_URL, JWT_SECRET } = process.env;
module.exports.PORT = process.env.PORT || 3000;
module.exports.MONGODB_URL = NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://localhost:27017/newsexplorerdb';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
