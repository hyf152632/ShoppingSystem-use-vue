var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[
    {
    "addressId" : String,
    "userName" : String,
    "streetName" : String,
    "postCode" : Number,
    "tel" : Number,
    "isDefault" : Boolean
  }
  ]
});

module.exports = mongoose.model("User",userSchema);    //数据库中的collectionName需要带复数,比如：users
                                                      //如果不带，需要指定参数，如：mongoose.model('user',userSchema,'users');
