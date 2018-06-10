import { users } from '../models/users';

/* 8.5 Return ALL users */
export function getAllUsers(req, res) {
  res.send(JSON.stringify(users));
};
