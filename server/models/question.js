var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  content:  String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question