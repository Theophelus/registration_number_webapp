//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Reg_numbers = require('./reg_number');
// const session = require('express-session');
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

//define a get route handler to render home
app.get('/', async (req, res, next) => {
    try {
        let display = await regNumber.getReg();
        let allTowns = await regNumber.populteTowns()
        res.render('home', {
            display,
            allTowns
        });
    } catch (error) {
        console.log(next(error.stack));
    }
});
// define a POST ROUTE HANDLER TO ENTER REGISTATIONS INTO THE DATABASE
app.post('/reg_number', async (req, res, next) => {
    try {
        let regex = /^[a-zA-Z]{2,3}(\s)[0-9]{3}(\-)[0-9]{3}$/;
        let enterReg = req.body.inputTxt;
        if (!enterReg && enterReg == '') {
            req.flash('error', 'Please Enter Registration Number');
            return res.redirect('/');
        }
        if (!enterReg.match(regex)) {
            req.flash('error', 'Please Enter The Correct Registration Number Format eg: CA 123-456');
            return res.redirect('/');
        } else {
            if(enterReg.match(regex)) {
                await regNumber.addRegistration(enterReg)
                req.flash('success', 'Registration Added successfully..!');
                res.redirect('/')
            }else {
                req.flash('error', 'Registration Number should starts with: CA, CL, CJ and CAW Or Registration Number Already Exists..!');
                res.redirect('/')
            }
        }
        // if (enterReg !== undefined) {
        // res.render('home', {
        // let display = await regNumber.filterRegistrations(towns)
        // i
        // });

        // }

    } catch (error) {
        console.log(next(error.stack));
    }
});

//define a GET Route Handler for when filtering By towns
app.post('/town', async (req, res, next) => {
    let towns = req.body.towns;
    let display = await regNumber.filterRegistrations(towns)
    console.log(display)
    res.render('home', {
        display
    });
});
let PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log('app starting on PORT', PORT);
});