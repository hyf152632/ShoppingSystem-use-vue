var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "checked":String,
  "productImage":String,
  "productNum":Number
});

module.exports = mongoose.model('Good',produtSchema);




