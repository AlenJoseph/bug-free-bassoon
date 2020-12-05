/**
 * @fileoverview Controller for Customer Auth
 *
 * @author Alen Joseph
 */


const log4js = require('log4js');

// logger config
const logger = log4js.getLogger('user.js controller');


// User Model

const User = require('../models/User')

// @route   POST /add_user
// @desc    add user add_user 
// @Input   user details
// @Output  Response message
// @access  Public

exports.add_user=  (req, res) => {

      /*
      checking wether the request contains all the required fields.
  */
  logger.info({ path: "api/user/add_user", desc: "Add  user" });
  const validateInput = require('../validation/add_user')
  const { errors, isValid } = validateInput(req.body);

  /** Check Validation */
  if (!isValid) {
    logger.error({ msg: "not successfull" });
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          logger.error({ msg: "Email already exists" });
          res.status(400).json({ msg: "Email already exists",status:false });
        } else {
          const user = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email: req.body.email,
            age: parseInt(req.body.age)
          });
       
            user
            .save()
            .then(user => {
                logger.info({ msg: "user register successfully" });
                res.status(200).json({ msg: "user added successfully" ,status:true,user_info:user});
            })
            .catch(err => {
                logger.error({ msg: "not registered successfull" });
                res.status(400).json({ msg: "Email already exists" ,status:false});
            });
         
        }
      })
      .catch(err => {
        logger.error({ msg: "not registered successfull" })
      });
  }
    
}