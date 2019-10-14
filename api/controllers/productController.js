'use strict';
const mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = (req, res) => {
  let { keyword, max_price, min_price } = req.query;
  max_price = parseInt(max_price);
  min_price = parseInt(min_price);

  Product.find({
    $and: [
      {
        price: { $gte: min_price}
      },
      {
        price: { $lte: max_price }
      },
      {
        price: { $exists: true }
      }
    ]
  }, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.create_a_product = (req, res) => {
  let new_product = new Product(req.body);
  new_product.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
    console.log(product);
  });
};


exports.read_a_product = (req, res) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.update_a_product = (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.delete_a_product = (req, res) => {


  Product.remove({
    _id: req.params.productId
  }, (err, product) => {
    if (err)
      res.send(err);
    res.json({ message: 'product successfully deleted' });
  });
};



