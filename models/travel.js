const mongoose = require('mongoose');

let travelSchema = mongoose.Schema({
  date: {
    type: Date, required: true
  },
  location : {
    type: String, required: true
  },
  description : {
    type: String
  }
});

let Travel = module.exports = mongoose.model('Travel', travelSchema);