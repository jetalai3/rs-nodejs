const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = async () => await usersRepo.getAll();
const addUser = async user => await usersRepo.addUser(user);
const getUserById = async id => await usersRepo.getUserById(id);
const updateUserById = async (id, body) =>
  await usersRepo.updateUserById(id, body);
const deleteUserById = async id => {
  await usersRepo.deleteUserById(id);
  await tasksService.deleteUserFromTaskByUserId(id);
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
