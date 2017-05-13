var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  password: String,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User