var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://clafinln:4PC8o4xZsapHqpKcFGAGDBT2qH3CJvqI@lionfish.rmq.cloudamqp.com/clafinln';
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('news-letter-queue', function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});