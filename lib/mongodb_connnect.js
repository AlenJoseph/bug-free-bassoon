// Connect to MongoDB

const mongoose = require('mongoose');
const DB_UR =require('../config/config').mongoURI
const log4js = require('log4js');




const logger = log4js.getLogger('mongodb_connect.js');


exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_UR, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

