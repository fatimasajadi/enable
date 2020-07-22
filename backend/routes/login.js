const express = require('express');
const router = express.Router();
const { checkPassword } = require('../helper/loginHelper');


module.exports = db => {

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.send("Entering login")
  });

  router.post('/', (req, res) => {
    console.log("Started");
    let user = null;
      const { email, password } = req.body
      const query = {
        text: "SELECT email, password FROM users WHERE email = $1;",
        values: [email]
      };
    
      return db.query(query)
        .then(result => 
          {
             user = result[0];
            if(checkPassword(password, user)) {
              res.json(user)
            }else{
              res.json(null)
            }
          })
        .catch(err => console.log(err));
  });

  return router;

};