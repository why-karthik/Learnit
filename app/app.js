// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const _ = require('lodash');

require("./extrafunc/dbConnection");
const { authorize, validateForm } = require('./extrafunc/authenticator'); // Import the authorize function
const { AddUser, findUser, getUserFirstName, getCourses} = require('./extrafunc/crud'); // Import the validateForm and AddUser functions

// Create an Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Your application logic goes here


app.route("/login")
    .get((req, res) => {
        res.render('login');
    })
    .post(async (req, res) => { // Use async function here
        const user = req.body.username;
        const pass = req.body.password;
        const userId = await authorize(user, pass); // Wait for the result

        if (userId) {
            res.redirect('/home/'+ userId);
        } else {
            res.redirect('/login');
        }
    });


app.route("/signup")
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const user = req.body.username;
        const pass = req.body.password;
        const conPass = req.body.confirmPassword;
        if (validateForm(pass, conPass)) {
            const userId = AddUser(fname, lname, user, pass);
            res.redirect('/home/'+ userId);
        }
        res.redirect('/signup')
    });


app.route("/home")
    .get(async (req, res) => {
        // Find the most recently added courses
        const courses = await getCourses()
        res.render('home', { userFirstName: "Familia", courses: courses});
    })

app.route("/home/:userId")
    .get(async (req, res) => {
        console.log(req.params.userId)
        const fname = await getUserFirstName(req.params.userId);
        res.render('home', {
            userFirstName: (fname),
            courses: await getCourses()
        });
    })
    .post((req, res) => {
        const user = req.body.username;
        const pass = req.body.password;
        const conPass = req.body.confirmPassword;
        if (validateForm(pass, conPass)) {
            AddUser(user, pass)
            //res.redirect('/home/user')
        }
    })



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
