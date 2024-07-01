const bookModel = require("../../models/book.model")

module.exports.getBooks = async (req, res) => {

    const books = await bookModel.find();
    res.status(201).send({books})
}

module.exports.getBook = (req, res) => {
    
}

module.exports.getBestRating = (req, res) => {
    
}

module.exports.postBook = async (req, res) => {

    const {title, author, year, genre} = req.body

    try {
        
        const book = await bookModel.create({
            title,
            author,
            year,
            genre,
            imageUrl: "none",
            userId: res.locals.user._id
        })

        return res.status(201).json(book);

    } catch (error) {
        throw new Error(error);
    }

}

module.exports.editBook = (req, res) => {
    
}

module.exports.deleteBook = (req, res) => {
    
}

module.exports.rateBook = (req, res) => {
    
}