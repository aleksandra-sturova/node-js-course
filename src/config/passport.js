import passport from 'passport';
import LocalStrategy from 'passport-local';
import { users } from '../models/users';

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(userData =>
    userData.userName === username && userData.password === password);

  if (user) {
    done(null, { name: user.userName, email: user.email, provider: 'local' });
  }
  done(null, false);
}));

export { passport };
