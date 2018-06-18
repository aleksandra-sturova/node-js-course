import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';
import { queryParser, setCoockies } from './middlewares/middlewares';

const app = express();

app.use(queryParser());
app.use(cookieParser(), setCoockies());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/products', routes.productsRouter);
app.use('/api/v1/users', routes.usersRouter);

export default app;
