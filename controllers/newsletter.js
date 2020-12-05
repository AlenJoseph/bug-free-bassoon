/**
 * @fileoverview Controller for Newsletter
 *
 * @author Alen Joseph
 */


const log4js = require('log4js');
const nodemailer = require("nodemailer");
const csv = require('fast-csv');
const fs = require('fs');
const publishToQueue=require('../services/rabbit_mq_producer').publishToQueue

// logger config
const logger = log4js.getLogger('newsletter.js controller');

// email config
const config=require('../config/config')


// @controller   POST /api/customer/login
// @desc    Login customer 
// @Input   Customername and Password
// @Output  File
// @access  Public

exports.login=  (req, res) => {

  /*
      checking wether the request contains all the required fields.
  */
  if( !req.body.uname|| !req.body.password){
      return res.status(400).send({
          error : "Expected values missing"
      })
  }
  else{
      /*
          consolidating the results to be send to the client
      */

      let result = {
          customer : req.body.uname,
          password: req.body.password,
   
      }
      logger.info(result)
      return res.send(result);

  }
}

exports.send_newsletter=  (req, res) => {
      
    const fileRows = [];
  const validateCsvData = require('../validation/upload_csv')
  // open uploaded file
  csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
      const validationError = validateCsvData(fileRows);
      if (validationError) {
        return res.status(403).json({ error: validationError });
      }
      else{
          const dataRows = fileRows.slice(1, fileRows.length)
          for(data in dataRows){
              row=dataRows[data]
              payload={"email":row[0],"newletter_content":row[1],"newletter_name":row[2]}
              publishToQueue(config.news_letter_queue,payload)
          }
      }
      return res.json({ message: "valid csv" })
    })
  
    
    
}


exports.send_email=  (email, newsletter_name,newletter_content) => {



    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: config.smtpMailid,
          pass: config.smtpPassword
        }
      });

      let mailOptions = {
        from: 'alenjoseph333@gmail.com',
        to: 'alenjoseph333@gmail.com',
        subject:'subjec',
        text: 'hi'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          logger.error({ "Email sent": "Email failed to send" });
          res.status(404).json({
            success: false,
            "Email sent": error
          });
        } else {
          logger.info("Email sent: " + info.response);
          res.status(200).json({
            success: true,
            "Email sent": info.response
          });
        }
      });
}