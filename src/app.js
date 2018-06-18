import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';
import { passport } from './config/passport';
import { queryParser, setCoockies, checkToken } from './middlewares/middlewares';

const app = express();

app.use(queryParser());
app.use(cookieParser(), setCoockies());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api/v1/products', checkToken, routes.productsRouter);
app.use('/api/v1/users', checkToken, routes.usersRouter);
app.use('/auth', routes.authRouter);

app.get('/error', (req, res) => {
  res.status(401).send('Unathorized: Bad credentials');
});

export default app;
