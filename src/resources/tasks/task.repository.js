const Task = require('./task.model');
const { ErrorHandler } = require('../../common/errorHandler');

const getAll = async () => {
  return await Task.find();
};

const addTask = async (boardId, task) => {
  return await Task.create({ ...task, boardId });
};

const getTaskByBoardId = async id => {
  const task = await Task.find({ boardId: id });
  if (task.length > 0) {
    return task;
  }
  throw new ErrorHandler(404, 'Task not found');
};

const getTaskByBoardAndTaskId = async (id, boardId) => {
  const task = await Task.findOne({ boardId, _id: id });
  if (task) {
    return task;
  }
  throw new ErrorHandler(404, 'Task not found');
};

const updateTaskById = async (id, boardId, body) => {
  return await Task.updateOne({ _id: id, boardId }, body);
};

const deleteTaskById = async (id, boardId) => {
  return await Task.deleteOne({ _id: id, boardId });
};

const deleteTaskByBoardId = async boardId => {
  const task = await Task.find({ boardId });
  if (task.length) {
    return Task.deleteMany({ boardId });
  }
};

const deleteUserFromTaskByUserId = async userId => {
  return await Task.updateMany({ userId }, { userId: null }, { multi: true });
};

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