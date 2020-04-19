const Board = require('./board.model');
const { ErrorHandler } = require('../../common/errorHandler');

const getAll = async () => {
  return await Board.find();
};

const addBoard = async board => {
  return await Board.create(board);
};

const getBoardById = async id => {
  const board = await Board.findOne({ id });
  if (board) {
    return board;
  }
  throw new ErrorHandler(404, 'Board not found');
};

const updateBoardById = async (id, body) => {
  return await Board.updateOne({ _id: id }, body);
};

const deleteBoardById = async id => {
  return await Board.deleteMany({ _id: id });
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};