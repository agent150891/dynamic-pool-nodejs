const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: null
    },
    httpCode: {
      type: Number,
      default: null
    }
  },
  { collection: 'site' }
);