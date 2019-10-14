'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  uniqueValidator = require('mongoose-unique-validator'),
  jwt = require('jsonwebtoken');


let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.comparePassword = password => {
  // return bcrypt.compareSync(password, this.hash_password);
  return bcrypt.compare(password, this.hash_password, (err, rusult) => {
    if (err) return res.status(404).send({ message: err });
    else {
      let token = jwt.sign({
        username: user.username,
        name: user.name,
        _id: user._id
      },
        'HoangHung',
        {
          expiresIn: "1h"
        }
      );
    }
  });
};


module.exports = mongoose.model('Users', UserSchema);