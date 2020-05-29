const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  address : {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, required: true},
  cart: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('User', userSchema, 'users');