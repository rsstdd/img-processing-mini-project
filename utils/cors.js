const cors = require('cors');

const corsConfig = (methods, credentials) => {
  if (methods) {
    return cors({
      origin: [/localhost:8080/],
      methods,
      credentials,
      maxAge: 3600,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }).bind(this);
  }
  return cors({
    methods: ['GET', 'POST'],
    maxAge: 3600,
    allowedHeaders: ['Content-Type'],
  }).bind(this);
};

module.exports = corsConfig;
