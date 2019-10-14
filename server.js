const express = require('express'),
  app = express(),
  port = process.env.PORT || 1337,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'), //created model loading here
  Product = require('./api/models/productModel'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'HoangHung', (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route 

const productRoute = require('./api/routes/productRoutes');
productRoute(app); //register the route  
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);