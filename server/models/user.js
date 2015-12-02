// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	displayName: String,
	phoneNumber: String

}, {
	collection: 'userinfo'
});

// Generate a Hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	
};

// Check to see if password is valid
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);