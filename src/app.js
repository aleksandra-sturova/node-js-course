import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import SwaggerUI from 'swagger-ui-express';
import routes from './routes';
import { passport } from './config/passport';
import { queryParser, setCoockies, checkToken } from './middlewares/middlewares';
import * as swaggerDoc from '../swagger.json';

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();

app.use('/node-js-api/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDoc));

morgan.token('id', req => req.id);
app.use(morgan('combined'));

app.use(queryParser());
app.use(cookieParser(), setCoockies());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

//app.use('/api/v1/products', checkToken, routes.productsRouter);
app.use('/api/v1/products', routes.productsRouter);
//app.use('/api/v1/users', checkToken, routes.usersRouter);
app.use('/api/v1/users', routes.usersRouter);
//app.use('/api/v1/cities', checkToken, routes.citiesRouter);
app.use('/api/v1/cities', routes.citiesRouter);
app.use('/auth', routes.authRouter);

app.get('/error', (req, res) => {
  res.status(401).send('Unathorized: Bad credentials');
});

export default app;
