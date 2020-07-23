const bcrypt = require('bcrypt');


const checkPassword = (password, foundUser) => {
  console.log("Check PW", password)
  return new Promise((resolve, reject) =>{
    bcrypt.compare(password, foundUser.password, (err, response) => {
      console.log(response)
       if (err) {
         reject(err)
       }else
         resolve(response)
     })
   
  })
   
}

module.exports = { checkPassword };