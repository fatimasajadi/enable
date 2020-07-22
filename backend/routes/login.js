const express = require('express');
const router = express.Router();
const { getUserByUsername } = require('../helper/loginHelper');


module.exports = db => {

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.send("Entering login")
  });

  router.post('/', (req, res) => {
    const signin = (request, response) => {
      const userReq = request.body
      let user
    
      findUser(userReq)
        .then(foundUser => {
          user = foundUser
          return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(() => {
          delete user.password_digest
          response.status(200).json(user)
        })
        .catch((err) => console.error(err))
    }
    
    

  });

  return router;

};