const { Schema, model } = require('mongoose');

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  webAuthnParams: {
    counter: Number,
    publicKey: String,
    credId: String,
  },
});

module.exports = model('User', userModel);
