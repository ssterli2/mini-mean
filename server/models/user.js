var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
   first_name: {
     type: String,
     minlength: 2,
     required: true,
   },
   last_name: {
     type: String,
     minlength: 2,
     required: true,
   },
  email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function( value ) {
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test( value );
          },
          message: "Invalid Email"
        }
      },
  password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
        validate: {
          validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
      },
  birthday: { type: Date, required: [true, "You must enter a birthday"],},
  createdAt: Date
});

UserSchema.plugin(uniqueValidator, { message: 'This {PATH} already exists. Please login.' });

UserSchema.methods.hashPass = function(pass){
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8));
};

UserSchema.pre('save', function(done){
  this.password = this.hashPass(this.password);
  console.log('pre save: ' + this.password);
  done();
});

var User = mongoose.model('User', UserSchema);
