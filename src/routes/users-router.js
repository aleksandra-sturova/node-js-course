import express from 'express';
import { getAllUsers } from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

export default usersRouter;
