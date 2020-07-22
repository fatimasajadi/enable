const bcrypt = require('bcrypt');


const checkPassword = (password, foundUser) => {

  if (bcrypt.compareSync(password, foundUser.password)) {
    return true;
  }
  console.log("No match")
  return false;
};


module.exports = { checkPassword };