let router = require('express').Router();

let authController = require('../controllers/auth.controller.js');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;