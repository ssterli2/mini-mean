var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

module.exports = {
  all_orders: function(req,res) {
    var response = {};
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if(err || user === null) {
        res.status(400).send({'user': false});
      } else {
        response.user = user;
        Order.find({}, function(err, orders) {
          if(err) {
            res.status(400).send({'orders': err});
          } else {
              response.orders = orders;
              Product.find({}, function(err, products) {
                if(err) {
                  res.status(400).send({'products': err});
                } else {
                  response.products = products;
                }
              res.json(response);
            });
          }
        });
      }
    });
  },
  new_order: function(req,res){
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if(err || user === null) {
        console.log('no user')
        res.status(400).send({'user': false});
      } else {
        console.log(req.body.product);
        Product.findOne({_id: req.body.product}, function(err, product) {
          console.log(product);
          if(err || product === null) {
            console.log('no prod')
            res.status(400).send({'product': err});
          } else {
            if (product.quantity < req.body.quantity) {
              console.log('no quant')
              res.status(400).send({'quantity': false});
            } else {
              var name = user.first_name + ' ' + user.last_name;
              console.log(product)
              var order = new Order({name: name, product: product.product, quantity: parseInt(req.body.quantity), createdAt: new Date()});
              order.save(function(err) {
                if(err) {
                  var return_errors = Object.keys(err.errors).map(function(error_key) {
                    return err.errors[error_key].order
                  })
                  console.log(return_errors)
                  res.status(400).send({'order': return_errors});
                } else {
                  res.json(order);
                }
            });
          }
          }
        });

    }
  });
}
};
