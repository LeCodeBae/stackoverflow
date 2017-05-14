var Vote = require('../models/vote')
var Answer = require('../models/answer')
var Question = require('../models/question');
var User = require('../models/user');

addVote = (req, res) => {
  let user = req.user;
  if(req.body.questionId!==null){
    User.findById(user._id).then((user)=>{
      var user=user
      Question.findById(req.body.questionId).then((question)=>{
        var question=question
        // for(let i = 0; i<user.votes.length;i++){
        //   for(let j = 0; j<question.votes.length;j++){
        //     if(user.votes[i] === question.votes[j]){
        //       console.log('hoii')
        //       res.send({
        //         msg: 'You can only vote once!'
        //       });
        //       return
        //     }
        //   }
        // }
        Vote.findOne({
          voter: user._id,
          question: question._id
        }).then((vote)=>{
          if(vote!==null){
            res.send({
              msg: 'You can only vote once!'
            })
            return
          }
          var vote = new Vote({
            up : req.body.up,
            voter : user._id,
            question : question._id
          })
          vote.save((err,vote)=>{
            var vote=vote
            if(err) res.send(err)
            res.send(vote)
            question.votes.push(vote._id)
            question.save((err,question)=>{
              if(err) res.send(err)
              user.votes.push(vote._id)
              user.save((err,user)=>{
                if(err) res.send(err)
              })
            })
          })
        })
      })
    })
  }
  if(req.body.answerId){
    User.findById(user._id).then((user)=>{
      var user=user
      Answer.findById(req.body.answerId).then((answer)=>{
        var answer=answer
        // for(let i = 0; i<user.votes.length;i++){
        //   for(let j = 0; j<answer.votes.length;j++){
        //     if(user.votes[i] === answer.votes[j]){
        //       console.log('hoii')
        //       res.send({
        //         msg: 'You can only vote once!'
        //       });
        //       return
        //     }
        //   }
        // }
        Vote.findOne({
          voter: user._id,
          answer: answer._id
        }).then((vote)=>{
          if(vote!==null){
            res.send({
              msg: 'You can only vote once!'
            })
            return
          }
          var vote = new Vote({
            up : req.body.up,
            voter : user._id,
            answer : answer._id
          })
          vote.save((err,vote)=>{
            var vote=vote
            if(err) res.send(err)
            res.send(vote)
            answer.votes.push(vote._id)
            answer.save((err,answer)=>{
              if(err) res.send(err)
              user.votes.push(vote._id)
              user.save((err,user)=>{
                if(err) res.send(err)
              })
            })
          })
        })
      })
    })
  }
}

module.exports = {addVote};