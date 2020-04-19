const userRepo = require('./user.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await userRepo.getAll();
const addUser = async user => await userRepo.addUser(user);
const getUserById = async id => await userRepo.getUserById(id);
const updateUserById = async (id, body) =>
  await userRepo.updateUserById(id, body);
const deleteUserById = async id => {
  await userRepo.deleteUserById(id);
  await taskService.deleteUserFromTaskByUserId(id);
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
