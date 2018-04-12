'use strict';
module.exports = function(app) {

  var controller = require('../controllers/CVEServiceController');

  //controller Routes
  app.route('/user/:nickname')
    .get(controller.does_user_exist)
    .post(controller.add_user);
    //.put(controller.update_user);

  app.route('/session')
    .get(controller.generate_session);

  app.route('/session/:sessionid')
    .get(controller.get_session)
    .post(controller.add_user_to_session)
    .put(controller.remove_user_from_session);

  app.route('/url/:sessionid')
    .get(controller.get_session_url)
    .post(controller.set_session_url);
};
