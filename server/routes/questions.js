const express = require('express');
var router = express.Router();
var controller = require ('../controllers/questionController');
var jwtHelper = require ('../helpers/jwt')

router.get('/', controller.findAllQuestions);
router.get('/:id', controller.findOneQuestion);
router.post('/', jwtHelper, controller.addQuestion);
router.delete('/:id', jwtHelper, controller.deleteQuestion);
router.put('/:id', jwtHelper, controller.updateQuestion);

module.exports = router;