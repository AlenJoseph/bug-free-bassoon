const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create logs schema
const LogsSchema = new Schema({
  date: {
    type: Date,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  newsletter_name: {
    type: String,
    required: true
  }
});

module.exports = Logs = mongoose.model('logs', LogsSchema);