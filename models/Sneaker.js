const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  sneaker_name: { type: String, required: true },
  sneaker_ref: { type: String, required: true },
  sneaker_sizes: { type: String, required: true },
  sneaker_descr: { type: String, required: true },
  sneaker_price: Number,
  sneaker_img: String,
  sneaker_category: String,
  sneaker_id_tags: Array
});

const sneakerModel = mongoose.model("Sneakers", sneakerSchema);

module.exports = sneakerModel;
