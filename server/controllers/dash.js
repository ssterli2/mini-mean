var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

module.exports = {
  index: function(req,res) {
    var response = {};
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if(err || user === null) {
        res.status(400).send({'user': false});
      } else {
        response.user = user;
        var o = Order.find({}).sort({'createdAt': -1}).limit(3);
        o.exec(function(err, orders){
          if(err) {
            res.status(400).send({'orders': err});
          } else {
              response.orders = orders;
              var p = Product.find({}).sort({'createdAt': -1}).limit(5);
              p.exec(function(err, products){
                if(err) {
                  res.status(400).send({'products': err});
                } else {
                  response.products = products;
                  var u = User.find({}).sort({'createdAt': -1}).limit(3);
                  u.exec(function(err, users){
                    if(err) {
                      res.status(400).send({'users': err});
                    } else {
                      response.users = users;
                      res.json(response);
                    }
                  });
                }
            });
          }
        });
      }
    });
  },

}
