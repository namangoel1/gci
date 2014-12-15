var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  Entry: new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      require: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    }
  })
}