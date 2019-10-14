'use strict';

const mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');



exports.list_all_users = (req, res) => {
  User.find({}, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};



exports.create_a_user = (req, res) => {
  let new_user = new User(req.body);
  new_user.save((err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.read_a_user = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = (req, res) => {


  User.remove({
    _id: req.params.userId
  }, (err, user) => {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted'});
  });
};

exports.register = (req, res) => {
  let {username, password, name} = req.body;
  if(!username || !password || !name) {
    return res.json({message: 'Tham so ko hop le'});
  }

  let newUser = new User(req.body);
  // newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(400).send({message: err});
    } else {
      await newUser.save((err, user) => {
        if (err) {
          return res.status(400).send({
            message: err
          });
        } else {
          user.hash_password = undefined;
          return res.json(user);
        }
      });
    }
  });
  // newUser.save((err, user) => {
  //   if (err) {
  //     return res.status(400).send({
  //       message: err
  //     });
  //   } else {
  //     user.hash_password = undefined;
  //     return res.json(user);
  //   }
  // });
};


// exports.register = (req, res, next) => {
//   User.find({ username: req.body.username })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             const user = new User({
//               username: req.body.username,
//               password: req.body.password,
//               name: req.body.name
//             });
//             user
//               .save()
//               .then(result => {
//                 res.status(201).json(user);
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           }
//         });
//       }
//     });
// };

exports.login = (req, res) => {

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } /*else */if (user) {
      if (user.password !== req.body.password) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({ token: jwt.sign({ username: user.username, name: user.name, _id: user._id }, 'HoangHung', {expiresIn: "1h"}) });
      }
    }
  });

};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Error" });
  }
};