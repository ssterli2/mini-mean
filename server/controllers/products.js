var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

module.exports = {
  all_products: function(req,res){
    var response = {};
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if(err || user === null) {
        res.status(400).send({'user': false});
      } else {
          response.user = user;
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
    },
  new_product: function(req,res){
    var product = new Product({product: req.body.product, description: req.body.description, quantity: parseInt(req.body.quantity), createdAt: new Date()});
    product.save(function(err) {
      if(err) {
        var return_errors = Object.keys(err.errors).map(function(error_key) {
          return err.errors[error_key].product
        })
        res.status(400).send({'product': return_errors});
      } else {
        res.json(product);
      }
    });

  },
  remove_product: function(req,res){
    console.log(req.body.id);
    Product.remove({_id: req.body.id}, function(err, product){
      if(err || product === null) {
        res.status(400).send({'product': false});
      } else {
          res.status(200).send();
        }
    });
  },
  search_product: function(req,res){
    console.log(req.body.search);
    var search = req.body.search;
    Product.find({ product: new RegExp('.*' + search + '.*', 'i') }, function(err, products) {
      if(err) {
        res.status(400).send({'products': false});
      } else {
        console.log(products);
        res.json(products);
      }
    });
  }
}
