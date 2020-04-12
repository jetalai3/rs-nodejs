const { ErrorHandler } = require('../../common/ErrorHandler');

let usersArray = [];

const getAll = async () => {
  return usersArray;
};

const addUser = async user => {
  const users = await getAll();
  const addFlag = users.push(user);

  if (!addFlag) {
    throw new ErrorHandler(404, "Couldn't add new user");
  }
};

const getUserById = async id => {
  const users = await getAll();
  const findUser = users.find(user => user.id === id);

  return findUser ? findUser : {};
};

const updateUserById = async (id, body) => {
  let findFlag = false;
  const users = await getAll();

  usersArray = users.map(user => {
    if (user.id === id) {
      findFlag = true;
      return { ...user, ...body };
    }
    return user;
  });

  if (!findFlag) {
    throw new ErrorHandler(404, 'User not found');
  }
};

const deleteUserById = async id => {
  let findFlag = false;
  const users = await getAll();

  usersArray = users.filter(user => {
    if (user.id === id) {
      findFlag = true;
      return false;
    }
    return user;
  });

  if (!findFlag) {
    throw new ErrorHandler(404, 'User not found');
  }
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
