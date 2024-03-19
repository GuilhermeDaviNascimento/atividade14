const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require('express-session');
const app = express();
let upload = multer();
const usersController = require('./controller.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  if (req.session.username) {
    res.redirect('/sucesspage');
  } else {
    res.render("pages/index")
  }
});

app.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect('/sucesspage');
  } else {
    res.render("pages/login")
  }
});

app.get("/register", (req, res) => {
  if (!req.session.username) {
    res.redirect('/');
  } else {
    res.render("pages/register")
  }
});

app.get("/sucesspage", (req, res) => {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    res.render("pages/sucess")
  }
});

app.get("/falho", (req, res) => {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    res.render("pages/invalid")
  }
});

app.get("/adminpage", (req, res) => {
  if (!req.session.username) {
    res.redirect('/login');
  } else{
    res.render("pages/adminpage");
  }
});

app.post("/sucess", usersController.loginTest);

app.post("/createaccount", usersController.createAccount);

app.post("/adminpage/data", usersController.returnUsersList);

app.post("/adminpage/delete", usersController.deleteUser);

app.get('/logout', usersController.logoutSession);

app.listen(3000, () => console.log("Server ready"));