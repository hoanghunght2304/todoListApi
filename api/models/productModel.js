'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    discount: String
});

module.exports =  mongoose.model('Products', productSchema);;

