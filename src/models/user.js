const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('../../config/server');
const schema = new mongoose.Schema({
	first_name: String,
	email: String,
	mobile_number: Number,
	password: String,
}, {
	timestamps: true
});
schema.pre('save', async function (next) {
	// Hash the password before saving the user model
	const user = this;
	user.password = await bcrypt.hash(user.password, 8);
	next();
});
schema.methods.generateAuthToken = async function () {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign({
			_id: user._id
		},
		'-'
	);
	return token;
};
schema.methods.transform = function () {
	const transformed = {};
	const fields = [
		'id',
		'first_name',
		'email',
		'mobile_number',
	];

	fields.forEach(field => {
		transformed[field] = this[field];
	});
	return transformed;
};
schema.statics = {
	async findByCredentials(email, password) {
		// Search for a user by email and password.
		const user = await User.findOne({
			email
		});
		if (!user) {
			throw new Error('not_register');
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new Error('invalid_creds');
		}
		return user;
	},

};

const User = mongoose.model('User', schema);
export default User;