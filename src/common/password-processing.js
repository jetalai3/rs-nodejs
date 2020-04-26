const bcrypt = require('bcrypt');
const saltRounds = 10;

const encodePassword = async password => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkPassword = async (password, db_password) => {
  return await bcrypt.compare(password, db_password);
};

module.exports = {
  encodePassword,
  checkPassword
};
