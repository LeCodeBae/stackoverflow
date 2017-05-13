var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
  up: Boolean,
  voter: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote