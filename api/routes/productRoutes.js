'use strict';
module.exports = function(app) {
  let controller = require('../controllers/productController');

  // controller Routes
  app.route('/products')
    .get(controller.list_all_products)
    .post(controller.create_a_product);


  app.route('/products/:productId')
    .get(controller.read_a_product)
    .put(controller.update_a_product)
    .delete(controller.delete_a_product);
};
