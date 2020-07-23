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
    
       db.query(query)
        .then(result => 
          {
            console.log(result)
            user = result[0];
             checkPassword(password, user)
             .then(result => {
               if(result){
                 res.json({user})
               }else{
                 res.json({error: "UserName or Password Incorrect"})
               }
             })
             .catch(err => console.log(err));

          })
        .catch(err => console.log(err));
  });

  return router;

};