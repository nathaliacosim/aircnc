const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  }
}, {
  toJSON: {
    virtuals: true,
  }
});

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3030/files/${this.thumbnail}`;
});

SpotSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Spot', SpotSchema);