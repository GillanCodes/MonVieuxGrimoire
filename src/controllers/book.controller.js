const bookModel = require("../../models/book.model")

module.exports.getBooks = async (req, res) => {

    // We get all books
    const books = await bookModel.find();
    // Send all book
    res.status(201).json(books)
}

module.exports.getBook = async (req, res) => {
    
    // Get the id in params
    let {id} = req.params;
    // Get the book that corespond to the id
    let book = await bookModel.findById(id);
    // If the book exist return it
    if (book) return res.status(200).json(book);

    //Else send "no book"
    return console.log(new Error("no_book_found"))
}

module.exports.getBestRating = async (req, res) => {

    //Get the book that a sort by average rating and cut to get only the 3 firsts
    let books = await bookModel.find().sort({averageRating: -1}).limit(3);
    return res.status(200).json(books);
}

module.exports.postBook = async (req, res) => {

    // Get data in request body
    const {title, author, year, genre, ratings, averageRating} = JSON.parse(req.body.book)

    var imageUrl;
    if (req.file)
        var imageUrl = `${req.protocol}://${req.get('host')}/assets/books/${req.file.filename}`;

    try {
        
        // Create an entry in database
        const book = await bookModel.create({
            title,
            author,
            year,
            genre,
            imageUrl: imageUrl,
            userId: res.locals.user._id,
            ratings,
            averageRating
        });

        //Send the result
        return res.status(201).json(book);

    } catch (error) {
        return console.log(new Error(error)) 
    }

}

module.exports.editBook = async (req, res) => {
    
    try {

        // Get id in url params
        let {id} = req.params;
        // Get body params
        let {title, author, year, genre} = JSON.parse(req.body.book);

        //Check if image
        var imageUrl;
        if (req.file)
            //Create image path
            var imageUrl = `${req.protocol}://${req.get('host')}/assets/books/${req.file.filename}`;

        //Check if book owner is actual user
        let book = await bookModel.findById(id);
        if (book.userId !== res.locals.user._id.toString()) throw new Error("must_be_author_to_edit_book");

        //Update the book
        await bookModel.findByIdAndUpdate(id, {
            $set: {
                title,
                year,
                genre,
                author,
                imageUrl
            }
        }, {new: true, upsert: true}).then((data) => {
            //Send data
            res.status(201).json(data);
        }).catch((err) => { 
            throw new Error(err)
        })
        
    } catch (error) {
        return console.log(new Error(error))
    }

}

module.exports.deleteBook = async (req, res) => {
    
    try {

        // Get id in url params
        let {id} = req.params;
        //Check if book owner is actual user
        let book = await bookModel.findById(id);
        if (book.userId !== res.locals.user._id.toString()) throw new Error("must_be_author_to_edit_book");

        // Delete the book
        const delBook = await bookModel.findByIdAndDelete(id);

        //Send data
        res.status(201).json(delBook);

    } catch (error) {
        return console.log(new Error(error))
    } 

}

module.exports.rateBook = async (req, res) => {

    try {
        
        let {rating} = req.body;
        let {id} = req.params;

        let book = await bookModel.findById(id);

         //Check if actual user has already noted that book
        let userId = res.locals.user._id.toString();

        if (book.ratings.find((item) => item.userId === userId)) throw new Error("already_noted_that_book");

        // If not, update the book entry with the grade
        await bookModel.findByIdAndUpdate(id, {
            $addToSet: {
                ratings: {
                    userId: res.locals.user._id,
                    grade: rating
                }
            }
        }, {new: true, upsert: true}).then(async (data) => {
           
            //Calculate the new average note
            var sum = 0;
            data.ratings.forEach(function(item) { sum += item.grade });

            // We round up the note (4,9 => 5 || 3,6 => 4)
            var avg =  Math.ceil(sum / data.ratings.length);

            // Set the new average on book entry
            await bookModel.findByIdAndUpdate(id, {
                $set: {
                    averageRating: avg
                }
            }, {upsert: true, new:true}).then((data) => { 
                //Send data
                res.status(201).json(data);
            }).catch((err) => { 
                throw new Error(err);
            })

        }).catch((err) => { 
            throw new Error(err)
        })
        
    } catch (error) {
        return console.log(new Error(error))
    }

}