const userRepo = require('./board.repository');
const taskRepo = require('../tasks/task.repository');

const getAll = async () => await userRepo.getAll();
const addBoard = async user => await userRepo.addBoard(user);
const getBoardById = async id => await userRepo.getBoardById(id);
const updateBoardById = async (id, body) =>
  await userRepo.updateBoardById(id, body);
const deleteBoardById = async id => {
  await taskRepo.deleteTaskByBoardId(id);
  await userRepo.deleteBoardById(id);
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
