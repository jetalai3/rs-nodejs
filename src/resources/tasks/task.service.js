const taskRepo = require('./task.repository');

const getAll = async () => await taskRepo.getAll();
const addTask = async (boardId, task) => await taskRepo.addTask(boardId, task);
const getTaskByBoardId = async id => await taskRepo.getTaskByBoardId(id);
const getTaskByBoardAndTaskId = async (id, boardId) =>
  await taskRepo.getTaskByBoardAndTaskId(id, boardId);
const updateTaskById = async (id, boardId, body) =>
  await taskRepo.updateTaskById(id, boardId, body);
const deleteTaskById = async (id, boardId) =>
  await taskRepo.deleteTaskById(id, boardId);
const deleteTaskByBoardId = async boardId =>
  await taskRepo.deleteTaskByBoardId(boardId);
const deleteUserFromTaskByUserId = async userId =>
  await taskRepo.deleteUserFromTaskByUserId(userId);

module.exports = {
  getAll,
  addTask,
  getTaskByBoardId,
  getTaskByBoardAndTaskId,
  updateTaskById,
  deleteTaskById,
  deleteTaskByBoardId,
  deleteUserFromTaskByUserId
};