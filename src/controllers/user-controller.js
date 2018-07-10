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
export function deleteUserById(req, res) {
  const { id } = req.body;

  User.findOneAndRemove({ id }, (err, user) => {
    if (!user) {
      res.status(400).send({ message: 'User not found' });
    } else {
      res.status(200).send({ message: `User with id ${user.id} was successfully removed` });
    }
    if (err) {
      res.status(500).send({ message: 'An error occurred while deleting user' });
    }
  });
}

