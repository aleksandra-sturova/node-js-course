import express from 'express';
import { passport } from '../config/passport';
import { authWithToken } from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.post('/', authWithToken);
authRouter.post('/local', passport.authenticate('local', {
  failureRedirect: '/error',
  session: false,
}), (req, res) => {
  res.send(req.user);
});

export default authRouter;
