const mongoose = require('mongoose');
const {Schema} = mongoose;

const manufacturedSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: Number,
        required: true,
    },
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      manufacturedFileName: {
        data: Buffer,
        contentType: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      phones: [{
        type: Schema.Types.ObjectId,
        ref: 'Phones',
        autopopulate: true
      }],
});
manufacturedSchema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model("Manufactured", manufacturedSchema);
module.exports = model;