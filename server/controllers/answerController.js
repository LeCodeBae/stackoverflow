var Answer = require('../models/answer')
var Question = require('../models/question');
var User = require('../models/user');

findAnswers = (req,res) => {
  Answer.find({}).then((answers)=>{
    res.send(answers)
  })
}

addAnswer = (req,res) => {
  let user = req.user
  var answer = new Answer({
    creator: user._id,
    content: req.body.content,
    question: req.body.questionId
  })
  answer.save((err, answer)=>{
    if(err) res.send(err)
    User.findById(user._id).then((user)=>{
      if (err) res.send(err)
      user.answers.push(answer._id)
      user.save((err, user)=>{
        Question.findById(req.body.questionId).then((question)=>{
          question.answers.push(answer._id)
          question.save((err,question)=>{
            if (err) res.send(err)
            res.send(question)
          })
        })
      })
    })
  })
}

deleteAnswer = (req,res) => {
  Answer.remove({_id: req.params.id}, function(err, answer){
    if (err) res.send(err)
    res.send(answer)
  })
}

module.exports = {findAnswers,addAnswer,deleteAnswer};