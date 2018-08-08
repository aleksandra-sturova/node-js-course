import express from 'express';
import { getAllUsers, deleteUserById } from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;