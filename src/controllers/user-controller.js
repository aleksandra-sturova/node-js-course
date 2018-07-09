import User from '../models/user';

/* Return ALL users */
export function getAllUsers(req, res) {
  User.find({})
    .then((users) => {
      return users && users.length
        ? res.send(JSON.stringify(users))
        : res.status(404).send(JSON.stringify(users));
    });
}

/* Delete product by id */
/**  FINISH later*/
export function deleteUserById(req, res) {
  const { id } = req.params;
  User.findOneAndDelete({ id });
}

