'use strict';
module.exports = app => {
  let controller = require('../controllers/userController');

  // controller Routes
  app.route('/users')
    .get(controller.list_all_users)
    .post(controller.create_a_user);

  app.route('/users/:userId')
    .get(controller.read_a_user)
    .put(controller.update_a_user)
    .delete(controller.delete_a_user);

  app.route('/register')
    .post(controller.register);

  app.route('/login')
    .post(controller.login);

};
