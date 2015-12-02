var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var pass=bcrypt.hashSync('960106', bcrypt.genSaltSync(8), null);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects');
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services');
});

/* GET contact me page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});



router.get('/salt', function (req, res, next) {
    res.render('salt', {
        title: 'Home',
        pass: pass,
        displayName: req.user ? req.user.displayName : ''
    });
});

/*loads login page and checks if the user is logged in if they are redirect to users*/
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
       
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});
// process login request
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});






module.exports = router;
