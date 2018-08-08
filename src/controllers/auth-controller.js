import jwt from 'jsonwebtoken';
import User from '../models/user';

export function authWithToken(req, res, next) {
  const { userName, password } = req.body;

  User.findOne({ userName })
    .then((data) => {
      console.log('data', data);
      const allowAccess = data && data.password === password;

      if (allowAccess) {
        const token = jwt.sign({ userName }, 'secret13', { expiresIn: 10000 });

        res.status(200).send({
          data: {
            user: {
              email: data.email,
              name: data.name,
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
