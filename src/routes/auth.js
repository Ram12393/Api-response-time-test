/* eslint-disable lines-between-class-members */
import AuthService from '../services/auth/auth';
// import validation from '../validations/user.validation';
// const response = require('./handleResponse');

class Auth {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.post(
			'/v1/auth/register',
			this.register.bind(this)
		);
		this.router.post(
			'/v1/auth/login',
			this.login.bind(this)
		);
	}

	
	async register(req, res, next) {
		try {
			const user = await AuthService.register(req.body);
			res.send(user);
		} catch (error) {
			res.send(error)
		}
	}

	async login(req, res, next){
		try {
			const user = await AuthService.login(req.body);
			res.send(user);
		} catch (error) {
			res.send(error)

		}
	}


	
}
export default Auth;
