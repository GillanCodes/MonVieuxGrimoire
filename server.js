// Imports
let express = require('express');
require('dotenv').config({path: "./config/.env"})
let checkUser = require("./middlewares/checkUser.middleware")

// Init app
let app = express();

//Config dotenv
require('dotenv').config({path: "./config/.env"})
// Require the database file
require('./config/database');

// Body parser Import
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

app.use(checkUser)

let authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth/', authRoutes)

let booksRoutes = require('./src/routes/book.routes');
app.use('/api/books/', booksRoutes)

// Setup server port
app.listen(process.env.PORT, () => {
    console.log(`Server listening to : PORT ${process.env.PORT}`)
});