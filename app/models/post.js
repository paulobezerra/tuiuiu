module.exports = function(app, mongoose){
  var mongoose   = require('mongoose');
  var Schema = mongoose.Schema;
  
  var PostSchema = new Schema({
    description: String
  });

  return mongoose.model('Post', PostSchema);

}
