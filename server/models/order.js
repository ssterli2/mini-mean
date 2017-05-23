var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product: { type: String, required: true },
  quantity: Number,
  createdAt: Date
});
var Order = mongoose.model('Order', OrderSchema);
