const User = require('./user.model');

const getAll = async () => {
  return await User.find();
};

const addUser = async user => {
  return await User.create(user);
};

const getUserById = async id => {
  return await User.findById(id);
};

const updateUserById = async (id, body) => {
  return await User.updateOne({ _id: id }, body);
};

const deleteUserById = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
