// App instance and dependencies
const express = require('express');
const app = express();
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const auth = require('./auth.js');

// application configuration
app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// middleware (executed for every incoming request)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get('/', function (req, res){
  // render the login form
  res.render('index', { authError: req.authError });
});

app.post('/', auth.checkCredentials, function(req, res){
  // handle the form submission
  if (req.session.authenticated){
    console.log('authenticated!')
    // render a logged in page
    res.render('welcome', { authenticated: req.session.authenticated, username: req.body.username });
  } else {
    console.log('user or password do not match')
    // ...or redirect to the sign-in form
    res.render('index', { authError: req.authError });
  }
})

// Set up localhost:3000
app.listen(app.get('port'), function(){
  console.log('Started express application!')
});
