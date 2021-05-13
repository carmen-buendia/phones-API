const mongoose = require('mongoose');
const {Schema} = mongoose;

const phonesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: Number,
        required: true,
    },
      name: {
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
      path: {
        type: String,
        required: true,
      },
      imageFileName: {
        data: Buffer,
        contentType: String,
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
      },
      manufactured: [{
        type: Schema.Types.ObjectId,
        ref: 'Manufactured',
        autopopulate: true
      }],
});
phonesSchema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model("Phones", phonesSchema);
module.exports = model;