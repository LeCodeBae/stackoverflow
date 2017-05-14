const express = require('express');
var router = express.Router()
var controller = require('../controllers/voteController')
var jwtHelper = require('../helpers/jwt')

router.post('/',jwtHelper,controller.addVote)

module.exports = router;