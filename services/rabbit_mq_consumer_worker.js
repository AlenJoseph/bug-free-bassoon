const amqp = require('amqplib/callback_api');
const CONN_URL = require('../config/config').amqpURL;
const send_email = require('../controllers/newsletter').send_email
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('news-letter-queue', function (msg) {
      console.log('.....');
      
        console.log("Message:", msg.content.toString());
        let data= JSON.parse(msg.content.toString())
        send_email(data.email,data.newletter_name,data.newletter_content)
     
      },{ noAck: true }
    );
  });
});