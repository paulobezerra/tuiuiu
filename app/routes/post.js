module.exports = function(app){
  var express    = require('express');
  var router     = express.Router();
  var controller = app.controllers.post;

  router.route('/posts')
    .post(controller.create)
    .get(controller.list);

  router.route('/posts/:post_id')
    .get(controller.findById)
    .put(controller.update)
    .delete(controller.delete);

  return router;
}
