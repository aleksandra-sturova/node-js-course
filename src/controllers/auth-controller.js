import jwt from 'jsonwebtoken';
import User from '../models/user';

export function authWithToken(req, res, next) {
  const { userName, password } = req.body;

  User.find({ userName, password })
    .then((data) => {
      const currentUserData = data[0];
      const allowAccess = currentUserData && currentUserData.password === password;

      if (allowAccess) {
        const token = jwt.sign({ userName }, 'secret13', { expiresIn: 10000 });

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
    });
}
