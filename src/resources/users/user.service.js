const userRepo = require('./user.repository');
const tasksService = require('../tasks/task.service');
const { encodePassword } = require('../../common/password-processing');

const getAll = async () => await userRepo.getAll();
const addUser = async user => {
  const hash = await encodePassword(user.password);
  user.password = hash;
  await userRepo.addUser(user);
};
const getUserById = async id => await userRepo.getUserById(id);
const updateUserById = async (id, body) =>
  await userRepo.updateUserById(id, body);
const deleteUserById = async id => {
  await userRepo.deleteUserById(id);
  await tasksService.deleteUserFromTaskByUserId(id);
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
