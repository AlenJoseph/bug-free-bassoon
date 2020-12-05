const amqp = require('amqplib/callback_api');
const CONN_URL = require('../config/config').amqpURL;
const log4js = require('log4js');
const logger = log4js.getLogger('rabbit_mq_producer.js');
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    if(err) throw err
   conn.createChannel(function (err, channel) {
    if(err) throw err
      ch = channel;
   });
});
exports.publishToQueue = async (queueName, data) => {
    try{
    ch.sendToQueue(queueName,Buffer.from(JSON.stringify(data)))
    return true
    }
    catch(error){
        logger.error(error)
        return false

    }

    
}


process.on('exit', (code) => {
   ch.close();
   logger.warn(`Closing rabbitmq channel`);
   logger.info(code);
});