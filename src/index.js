import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongo from './lib/mongo';
import logger from './lib/logger';
import apiRouter from './apiRouter';
const logResponseTime = require("../src/lib/responseTimeLogger");



app.use(logResponseTime);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', apiRouter);



const server = app.listen(3005, () => {
	const serverAddress = server.address();
    console.log(`API running at http://localhost:${serverAddress.port}`);
});
mongo.mongoConnect();