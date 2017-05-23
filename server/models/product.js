var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  product: {type: String, required: true},
  description: String,
  quantity: Number,
  createdAt: Date
});
var Product = mongoose.model('Product', ProductSchema);
