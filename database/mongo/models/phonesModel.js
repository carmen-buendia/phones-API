const mongoose = require('mongoose');
const {Schema} = mongoose;

const phonesSchema =  new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: Number,
        required: true,
    },
      name: {
        type: String,
        required: true,
      },
      manufactured: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required:  true,
      },
      color: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      imageFileName: {
        data: Buffer,
        type: String,
        default: []
      },
      screen: {
        type: String,
        required: true,
      },
      processor: {
          type: String,
          required: true,
      },
      ram: {
          type: String,
          required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      }
});

const model = mongoose.model('Phones', phonesSchema);
module.exports = model;