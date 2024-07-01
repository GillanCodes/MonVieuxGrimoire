let mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    author: {
        required: true,
        type: String,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: String,
    },
    genre: {
        required: true,
        type: String,
    },
    rating: {
        type: [
            {
                userId: String,
                grade: Number
            }
        ]
    },
    averageRating: {
        type: Number
    }

}, {
    timestamps: true
});

const bookModel = mongoose.model("book",bookSchema);
module.exports = bookModel;