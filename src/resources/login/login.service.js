const loginRepo = require('./login.repository');
const { checkPassword } = require('../../common/password-processing');
const { ErrorHandler } = require('../../common/errorHandler');
const jwt = require('jsonwebtoken');

const loginUser = async body => {
  const user = await loginRepo.findUserByLogin(body);

//   const isCorrectPassword = await checkPassword(body.password, user.password);

  if (await checkPassword(body.password, user.password)) {
    return jwt.sign(
      {
        userId: user._id,
        login: user.login
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
  }
  throw new ErrorHandler(401, 'Wrong login or password');
};

module.exports = {
  loginUser
};
