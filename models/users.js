const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleID:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: Buffer || String
  },
  goal: {
    type: String
  },
  weight: {
    type: Number
  },
  token: {
    type: String
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = { User }