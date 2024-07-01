let router = require('express').Router();

let bookController = require("../controllers/book.controller");
let auth = require('../../middlewares/auth.middleware')

router.get('/', bookController.getBooks);
router.get('/bestrating', bookController.getBestRating);
router.get('/:id', bookController.getBook);

router.post('/', auth, bookController.postBook);
router.post('/:id/rating', auth, bookController.rateBook);

router.put('/:id', auth, bookController.editBook);

router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;