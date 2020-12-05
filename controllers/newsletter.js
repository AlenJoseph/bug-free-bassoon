/**
 * @fileoverview Controller for Newsletter
 *
 * @author Alen Joseph
 */


const log4js = require('log4js');
const nodemailer = require("nodemailer");
const csv = require('fast-csv');
const fs = require('fs');
const publishToQueue=require('../rabbit_mq_services/rabbit_mq_producer').publishToQueue

// logger config
const logger = log4js.getLogger('newsletter.js controller');

// email config
const config=require('../config/config')

// import Model
const User = require('../models/User')
const Logs = require('../models/Logs')


// @controller   POST /api/customer/login
// @desc    Login customer 
// @Input   Customername and Password
// @Output  File
// @access  Public


exports.send_newsletter_queue=  (req, res) => {
      
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

    User.findOne({email:email})
      .then(response=>{
          console.log(response)
        if(response){

          name = response.firstname + ' '+response.lastname
          let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: config.smtpMailid,
              pass: config.smtpPassword
            }
          });
    
          let mailOptions = {
            from: 'noreply@demo.com',
            to: email,
            subject:newsletter_name,
            text: `Hi ${name} \r\n ${newletter_content}`
          };
    
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              logger.error({ "Email sent": "Email failed to send" });
                          
            Logs.findOne({ email: email })
            .then(logs => {
              if (logs) {
                logger.error({ msg: "Email already exists" });
              } else {
                  date=new Date().toLocaleString()
                const logs = new Logs({
                  date:date,
                  newsletter_name:newsletter_name,
                  email: email,
                }); 
                  logs
                  .save()
                  .then(logs => {
                      logger.info({ msg: "logs added successfully" });
                      payload={'email':email,'newletter_name':newsletter_name,'newsletter_content':newletter_content}
                      publishToQueue(config.parking_lot_queue,payload)
                     
                  })
                  .catch(err => {
            
                      logger.error({ msg: "write to log failed" });
                    
                  });
               
              }
            })
            .catch(err => {
              logger.error({ msg: "email queue failed" })
            });
              
            } else {
              logger.info("Email sent: " + info.response);
            }
          });
        }
        else{
            
            Logs.findOne({ email: email })
            .then(logs => {
              if (logs) {
                logger.error({ msg: "Email already exists" });
              } else {
                  date=new Date().toLocaleString()
                const logs = new Logs({
                  date:date,
                  newsletter_name:newsletter_name,
                  email: email,
                }); 
                  logs
                  .save()
                  .then(logs => {
                      logger.info({ msg: "logs added successfully" });
                      payload={'email':email,'newletter_name':newsletter_name,'newsletter_content':newletter_content}
                      publishToQueue(config.parking_lot_queue,payload)
                     
                  })
                  .catch(err => {
            
                      logger.error({ msg: "write to log failed" });
                    
                  });
               
              }
            })
            .catch(err => {
              logger.error({ msg: "email queue failed" })
            });
        }

}).catch(err => {
    logger.error({ msg: "email queue failed" })
  });


}