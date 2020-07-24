const bcrypt = require('bcrypt');


const checkPassword = (password, foundUser) => {
  return new Promise((resolve, reject) =>{
    bcrypt.compare(password, foundUser.password, (err, response) => {
       if (err) {
         reject(err)
       }else
         resolve(response)
     })
   
  })
   
}

module.exports = { checkPassword };