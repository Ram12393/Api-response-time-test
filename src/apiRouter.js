/* eslint-disable no-new */
import express from 'express';
import Auth from './routes/auth';
const apiRouter = express.Router();

new Auth(apiRouter);

export default apiRouter;
