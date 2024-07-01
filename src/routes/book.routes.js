let router = require('express').Router();

let bookController = require("../controllers/book.controller");
let auth = require('../../middlewares/auth.middleware')

router.get('/', bookController.getBooks);
router.get('/bestrating', bookController.getBestRating);
router.get('/:id', bookController.getBook);

router.post('/', auth, bookController.postBook);

router.put('/:id', auth, bookController.editBook);

module.exports = router;