const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await usersService.getUserById(id);

    res.status(200).json(User.toResponse(user));
  } catch (error) {
    console.log(error);

    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);

  try {
    await usersService.addUser(user);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await usersService.updateUserById(id, body);
    res.status(200).json();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  try {
    await tasksService.deleteUserFromTaskByUserId(id);
    await usersService.deleteUserById(id);
    res.status(200).json();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
