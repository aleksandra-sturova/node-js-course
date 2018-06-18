import { users } from '../models/users';

/* 8.5 Return ALL users */
export function getAllUsers(req, res) {
  return users && users.length
    ? res.send(JSON.stringify(users))
    : res.status(404).send(JSON.stringify(users));
}
