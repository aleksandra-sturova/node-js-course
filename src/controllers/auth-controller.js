import jwt from 'jsonwebtoken';
// import * as jwtConfig from '../config/config.json';
import { users } from '../models/users';

export function authWithToken(req, res, next) {
  const { userName, password } = req.body;

  const currentUserData = users.find(user => user.userName === userName);
  const allowAccess = currentUserData && currentUserData.password === password;

  if (allowAccess) {
    const token = jwt.sign({ userName }, 'secret13', { expiresIn: 30 });

    res.status(200).send({
      data: {
        user: {
          email: currentUserData.email,
          name: currentUserData.name,
        },
      },
      token,
    });
  } else {
    res.status(404).send({ message: 'Not Found' });
  }
  next();
}
