import User from '../../models/user';
const bcrypt = require('bcryptjs');

class AuthService {
	async register(data) {
		try {
			const user = new User(data);
			const salt = await bcrypt.genSalt(10);
			// user.password = await bcrypt.hash(user.password, salt);
			await user.save();
			const savedUser = user.transform();
			return savedUser
		} catch (error) {
			throw error;
		}
	}

	async login(data){
		try {
			const { email, password } = data;
			let user = await User.findByCredentials(email, password);
			const token = await user.generateAuthToken();
			user = user.transform();
			return { user, token };
		} catch (error) {
			throw error
		}
	}
}

export default new AuthService();
