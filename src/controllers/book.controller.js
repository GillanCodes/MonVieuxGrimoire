const bookModel = require("../../models/book.model")

module.exports.getBooks = async (req, res) => {

    // We get all books
    const books = await bookModel.find();
    // Send all book
    res.status(201).send({books})
}

module.exports.getBook = async (req, res) => {
    
    // Get the id in params
    let {id} = req.params;
    // Get the book that corespond to the id
    let book = await bookModel.findById(id);
    // If the book exist return it
    if (book) return res.status(200).send({book});

    //Else send "no book"
    return res.status(401).send("no book")
}

module.exports.getBestRating = async (req, res) => {

    //Get the book that a sort by average rating and cut to get only the 3 firsts
    let books = await bookModel.find().sort({averageRating: -1}).limit(3);
    return res.status(200).json({books});
}

module.exports.postBook = async (req, res) => {

    // Get data in request body
    const {title, author, year, genre} = req.body

    try {
        
        // Create an entry in database
        const book = await bookModel.create({
            title,
            author,
            year,
            genre,
            imageUrl: "none",
            userId: res.locals.user._id
        });

        //Send the result
        return res.status(201).json(book);

    } catch (error) {
        throw new Error(error);
    }

}

module.exports.editBook = async (req, res) => {
    
    try {

        let {id} = req.params;
        let {title, author, year, genre} = req.body;

        let book = await bookModel.findById(id);

        if (book.userId !== res.locals.user._id.toString()) throw new Error("must_be_author_to_edit_book");

        await bookModel.findByIdAndUpdate(id, {
            $set: {
                title,
                year,
                genre,
                author
            }
        }, {new: true, upsert: true}).then((data) => {
            res.status(201).send({data});
        }).catch((err) => { 
            throw new Error(err)
        })
        
    } catch (error) {
        throw new Error(error);
    }

}

module.exports.deleteBook = (req, res) => {
    
}

module.exports.rateBook = (req, res) => {
    
}