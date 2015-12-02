var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var pass=bcrypt.hashSync('960106', bcrypt.genSaltSync(8), null);
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About',
        displayName: req.user ? req.user.displayName : ''
    });
});
/* GET projects page. */
router.get('/projects', function (req, res, next) {
    res.render('projects', {
        title: 'Projects',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* GET services page. */
router.get('/services', function (req, res, next) {
    res.render('services', {
        title: 'Service',
        displayName: req.user ? req.user.displayName : ''
    });
});
/* GET contact me page. */
router.get('/contact', function (req, res, next) {
    res.render('contact', {
        title: 'Contact',
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

/* Show Todo List Page */
router.get('/todolist', function (req, res, next) {

        res.render('todolist', {
            title: 'Todos',
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '' 
        });

});




module.exports = router;
