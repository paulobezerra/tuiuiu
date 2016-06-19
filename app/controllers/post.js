module.exports = function(app){
  var controller = {};
  var Post = app.models.post;

  controller.create = function(req, res) {
      var post = new Post();      // create a new instance of the 'Post' model
      post.description = req.body.description;  // set the posts name (comes from the request)

      // save the post and check for errors
      post.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Post created!' });
      });
  };

  controller.list = function(req, res) {
      Post.find(function(err, posts) {
          if (err)
              res.send(err);

          res.json(posts);
      });
  };

  controller.findById = function(req, res) {
      Post.findById(req.params.post_id, function(err, post) {
          if (err)
              res.send(err);
          res.json(post);
      });
  };

  controller.update = function(req, res) {

      // use our bear model to find the bear we want
      Post.findById(req.params.post_id, function(err, post) {

          if (err)
              res.send(err);

          post.description = req.body.description;  // update the bears info

          // save the bear
          post.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'Post updated!' });
          });

      });
  };

  controller.delete = function(req, res) {
      Post.remove({
          _id: req.params.post_id
      }, function(err, post) {
          if (err)
              res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
  };


  return controller;
};
