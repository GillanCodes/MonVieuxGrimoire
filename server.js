// Imports
let express = require('express');
require('dotenv').config({path: "./config/.env"})

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



let authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth/', authRoutes)


// Setup server port
app.listen(process.env.PORT, () => {
    console.log(`Server listening to : PORT ${process.env.PORT}`)
});