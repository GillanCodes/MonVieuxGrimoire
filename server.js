// Imports
let express = require('express');
require('dotenv').config({path: "./config/.env"})

// Init app
let app = express();

//Config dotenv
require('dotenv').config({path: "./config/.env"})
// Require the database file
require('./config/database');



// Setup server port
app.listen(process.env.PORT, () => {
    console.log(`Server listening to : PORT ${process.env.PORT}`)
});