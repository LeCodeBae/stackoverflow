var Question = require('../models/question');
var User = require('../models/user');

findAllQuestions = (req,res) => {
  Question.find({}).then((questions)=>{
    res.send(questions)
  })
}

findOneQuestion = (req,res) => {
  Question.findById(req.params.id)
  .populate('creator answers')
  .exec((err,question)=>{
    if (err) res.send(err)
    res.send(question)
  })
}

addQuestion = (req,res) => {
  let user = req.user
  var question = new Question({
    content: req.body.content,
    creator: user._id
  })
  question.save(function(err,question){
    if (err) res.send(err)
    let questionId = question._id
    User.findOne({_id: user._id},function(err,user){
      if (err) res.send(err)
      user.questions.push(questionId)
      user.save(function(err,user){
        if(err) res.send(err)
        res.send(user)
      })
    })
  })
}

updateQuestion = (req,res) => {
  let user = req.user
  Question.findById(req.params.id).then((question)=>{
    if(question.creator === user._id){
      question.content = req.body.content || question.content;
      question.save((err,question)=>{
        if (err) res.send(err)
        res.send(question)
      })
    } else {
      res.send({msg: 'You are not Authorised!'})
    }
  })
}

deleteQuestion = (req,res) => {let user = req.user
  Question.findById(req.params.id).then((question)=>{
    if(question.creator === user._id){
      Question.remove({_id: req.params.id}, function(err, question){
        if (err) res.send(err)
        res.send(question)
      })
    } else {
      res.send({msg: 'You are not Authorised!'})
    }
  })
}

module.exports = {findAllQuestions,findOneQuestion,addQuestion,updateQuestion,deleteQuestion};