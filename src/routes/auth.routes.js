let router = require('express').Router();

let authController = require('../controllers/auth.controller.js');

router.post('/signup', authController.register);
router.post('/login', authController.login);

module.exports = router;