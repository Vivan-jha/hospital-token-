const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  token: {
    type: String,
  },
}, {
  collection: 'patients',
});

module.exports = mongoose.model('Patient', patientSchema);
