/**
 * @fileoverview Route for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const express = require('express');
const router = express.Router();

// Load Upload Controller
const controller = require('../../controllers/user');


// @route   POST /add_user
// @desc    add user add_user 
// @Input   user details
// @Output  Response message
// @access  Public
router.post('/add_user', controller.add_user);



module.exports = router;