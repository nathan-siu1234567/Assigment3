// add a reference to the passport strategy
var LocalStrategy = require('passport-local').Strategy;

// import the User Model
var User = require('../models/user');

module.exports = function(passport) {
	
	// SETUP for Session Storage and Retrieval
	
	//serialize user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	
	//deserialze user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		
		// asynchronous process
		process.nextTick(function() {
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) {
					return done(err);
				}
				
				//no valid user found
				if(!user) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
				}
				
				//no valid password entered
				if(!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
				}
				
				//everything is ok - proceed with login
				return done(null, user);
			});
		});
	}));
	
}