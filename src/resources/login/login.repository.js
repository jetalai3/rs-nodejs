const User = require('../users/user.model');
const { ErrorHandler } = require('../../common/errorHandler');

const findUserByLogin = async ({ login }) => {
  const user = await User.findOne({ login });

  if (user) {
    return user;
  }

  throw new ErrorHandler(403, 'User not found');
};

module.exports = {
  findUserByLogin
};
