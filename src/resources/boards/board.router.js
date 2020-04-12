const router = require('express').Router();
const { Board } = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (_, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await boardService.getBoardById(id);
    res.json(Board.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = new Board(req.body);

    await boardService.addBoard(board);
    res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    await boardService.updateBoardById(id, body);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;

    await boardService.deleteBoardById(id);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
