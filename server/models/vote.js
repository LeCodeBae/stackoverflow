var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
  up: Boolean,
  voter: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote