// configurations
require('dotenv').config();
module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,
    stage:process.env.STAGE,
    smtpMailid:process.env.SMTP_MAIL_ID,
    smtpPassword:process.env.SMTP_PASSWORD,
    amqpURL:process.env.AMQP_URL,
    // rabbile mq queue name
    news_letter_queue:'news-letter-queue',
    parking_lot_queue:'parking-lot-queue'
  };