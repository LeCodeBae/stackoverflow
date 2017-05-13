const express = require('express');
var router = express.Router();
var controller = require ('../controllers/answerController');
var jwtHelper = require ('../helpers/jwt')

router.get('/', controller.findAnswers);
router.post('/', jwtHelper, controller.addAnswer);
router.delete('/:id', jwtHelper, controller.deleteAnswer);

module.exports = router;