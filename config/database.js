let mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_STRING)
    .then(() => {
        console.log("MongoDB : Connected");
    }).catch((err) => {
        throw new Error (err);
    });