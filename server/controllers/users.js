var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
  all_users: function(req,res){
    var response = {};
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if(err || user === null) {
        console.log('no user')
        res.status(400).send({'user': false});
      } else {
        response.user = user;
        User.find({}, function(err, users) {
          if(err) {
            console.log('MY errors:');
            console.log(err.errors);
          } else {
            response.users = users;
            res.json(response);
          }
        });
      }
    });
  },
  login: function(req,res){
    User.findOne({email: req.body.login_email}, function(err, user) {
      if(err || user === null) {
        res.status(400).json({'error': 'Invalid Login'});
      } else {
        if (req.body.login_password !== null && bcrypt.compareSync(req.body.login_password, user.password)){
          req.session.user_id = user._id;
          console.log('success');
          console.log(req.session.user_id);
          res.status(200).send();
        }
        else {
          res.status(400).json({'error': 'Invalid Login'});
        }
      }
    });

  },
  create: function(req,res){
    console.log(req.body);
      var user = new User(req.body);
      user.createdAt = new Date();
      user.save(function(err, newuser) {
            if (err){
              var return_errors = Object.keys(err.errors).map(function(error_key) {
                return err.errors[error_key].message
              })
              console.log(return_errors);
              res.status(400).send(return_errors)
            }
            else{
            req.session.user_id = user._id;
            res.json(user);
          }
      });
  },
  logout: function(req,res){
    req.session.destroy();
    res.status(200).send();
  },
  check_login: function(req,res){
    if (req.session.user_id) {
      res.json({'logged_in': true});
    }
    else {
      res.json({'logged_in': false});
    }
  }
}
