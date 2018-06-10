import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { router } from './routes/routes';
import { queryParser, setCoockies } from './middlewares/middlewares';

const app = express();

app.use(queryParser());
app.use(cookieParser(), setCoockies());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

export default app;