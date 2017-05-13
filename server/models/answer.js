var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  content:  String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer