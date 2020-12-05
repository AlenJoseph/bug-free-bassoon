const amqp = require('amqplib/callback_api');
const log4js = require('log4js');
const CONN_URL = require('../config/config').amqpURL;
const send_email = require('../controllers/newsletter').send_email
const MongoDBlib = require('../lib/mongodb_connnect');
const logging = require('../lib/logger-config');
/**Logger config*/
log4js.configure(logging.logerconfig);
const logger = log4js.getLogger('rabbit_mq_consumer_worker.js ');
/**Connet to Mongo DB */

MongoDBlib.connectDB();
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('news-letter-queue', function (msg) {
      logger.info('.....');
      
        logger.info("Message:", msg.content.toString());
        let data= JSON.parse(msg.content.toString())
        send_email(data.email,data.newletter_name,data.newletter_content)
     
      },{ noAck: true }
    );
  });
});

