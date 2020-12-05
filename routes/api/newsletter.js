/**
 * @fileoverview Route for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();

// Load Upload Controller
const controller = require('../../controllers/newsletter');


// multer config

const upload = multer({ dest: 'tmp/csv/' });



// @route   POST /send_newsletter
// @desc    Send newsletter 
// @Input   CSV with user details
// @Output  Response message
// @access  Public
router.post('/send_newsletter',upload.single('file'), controller.send_newsletter_queue);



module.exports = router;