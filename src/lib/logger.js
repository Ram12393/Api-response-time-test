const winston = require('winston');
const LOGS_FILE = 'logs/responseTime.log';

winston.configure({
	transports: [
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		}),
		new winston.transports.File({
			filename: LOGS_FILE
		})
	]
});