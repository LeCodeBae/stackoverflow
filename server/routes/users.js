var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController')
const passport = require('passport');

router.get('/', controller.findUsers);
router.get('/:id', controller.findOneUser);
router.post('/signup',controller.addUser);
router.post('/signin', passport.authenticate('local', { session: false }), controller.createToken);
router.post('/getId', controller.getId)

module.exports = router;
