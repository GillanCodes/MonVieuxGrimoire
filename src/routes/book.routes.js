let router = require('express').Router();

let bookController = require("../controllers/book.controller");
let auth = require('../../middlewares/auth.middleware')

router.get('/', bookController.getBooks);

router.post('/', auth, bookController.postBook);

module.exports = router;