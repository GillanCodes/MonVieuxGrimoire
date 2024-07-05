// Imports
let express = require('express');
require('dotenv').config({path: "./config/.env"})
let checkUser = require("./middlewares/checkUser.middleware")
let cors = require('cors')

// Init app
let app = express();

//Config dotenv
require('dotenv').config({path: "./config/.env"})
// Require the database file
require('./config/database');

//Cors config
    //This array is all the allowed ip to this api
let whiteList = [undefined, 'http://localhost:3000', "http://127.0.0.1:3000"];
const corsOptions = {
    origin : function (origin, cb) {
        if (whiteList.indexOf(origin) !== -1)
        {
            cb(null, true);
        } else {
            cb(new Error('Not Allowed by CORS'), true);
        }
    },
    'credentials' : true,
    'allowHeaders' : ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders' : ['sessionId'],
    'methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 200
}
app.use(cors(corsOptions));

app.use("/assets", express.static('public'));

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