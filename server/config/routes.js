var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var dash = require('../controllers/dash.js');
var products = require('../controllers/products.js');
var orders = require('../controllers/orders.js');
var User = mongoose.model('User');

module.exports = function(app) {
  app.get('/dash', function(req, res) {
    dash.index(req, res);
  });
  app.get('/all_customers', function(req, res) {
    users.all_users(req, res);
  });
  app.post('/users', function(req, res) {
    users.create(req, res);
  });
  app.post('/users/login', function(req, res) {
    users.login(req, res);
  });
  app.post('/logout', function(req, res) {
    users.logout(req, res);
  });
  app.post('/check_login', function(req, res) {
    users.check_login(req, res);
  });
  app.get('/products', function(req, res) {
    products.all_products(req, res);
  });
  app.post('/new_product', function(req, res) {
    products.new_product(req, res);
  });
  app.post('/remove_product', function(req, res) {
    products.remove_product(req, res);
  });
  app.post('/search_product', function(req, res) {
    products.search_product(req, res);
  });
  app.get('/orders', function(req, res) {
    orders.all_orders(req, res);
  });
  app.post('/new_order', function(req, res) {
    orders.new_order(req, res);
  });
};
