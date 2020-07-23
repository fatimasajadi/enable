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

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}

module.exports = { createToken, checkPassword };