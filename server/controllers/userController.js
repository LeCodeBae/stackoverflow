var User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');


findUsers = (req, res) => {
  User.find({}).then((users)=>{
    res.send(users)
  })
}

findOneUser = (req,res) => {
  User.findById(req.params.id)
  .populate('questions answers')
  .exec((err,question)=>{
    if(err) res.send(err)
    res.send(question)
  })
  
}
addUser = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,10)
  })
  user.save(function (err, user){
    if (err) res.send(err)
    res.send(user);
  })
}

createToken = (req,res) =>{
  let user = req.user
  User.findOne({username: user.username}).then((user)=>{
    let newToken = jwt.sign({
      _id: user._id
    },'secret',{ expiresIn: '1h' })
    res.send(newToken)
  })
}

module.exports = {addUser, findOneUser, findUsers, createToken};