const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message:
      'Too many request created from this IP, please try again after an 5 min',
  });