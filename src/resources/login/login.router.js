const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.loginUser(req.body);
    res.json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
