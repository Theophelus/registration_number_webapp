//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Reg_numbers = require('./reg_number');
const RegRoutes = require('./routes/registration_routes')
const pg = require("pg");
const Pool = pg.Pool;

//define instances
let app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
//define a connection string to be able to connect to the database.
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/registration_numberDB';
const pool = new Pool({
    connectionString
    // ssl: useSSL
});
// define instance of factory function
let regNumber = Reg_numbers(pool);
let regRoutes = RegRoutes(regNumber);
//configure express handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
//configure public for=lder for static files
app.use(express.static('public'));

//setup handlers
app.get('/', regRoutes.displayHome);
app.get('/delete', regRoutes.deleted);
app.post('/reg_number', regRoutes.addReg);
app.post('/selectedTowns', regRoutes.filterReg);


let PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log('app starting on PORT', PORT);
});