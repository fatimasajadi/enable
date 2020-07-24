const express = require('express');
const router = express.Router();
const { checkPassword } = require('../helper/loginHelper');


module.exports = db => {

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.send("Entering login")
  });

  //Post request for Login
  router.post('/', (req, res) => {
    console.log("Started");
    let user = null;
    const { email, password } = req.body
    const query = {
      text: "SELECT email FROM users WHERE email = $1;",
      values: [email]
    };

    db.query(query)
      .then(result => {
        user = result[0];
        if (user) {
          checkPassword(password, user)
            .then(result => {
              if (result) {
                //set Session
                req.session['user_id'] = user['id']
                res.json(req.session['user_id'])
              } else {
                res.json({ error: "Password Incorrect" })
              }
            })
            .catch(err => console.log(err));
        } else {
          res.json({ error: "Username Incorrect" })
        }
      })
      .catch(err => console.log(err));
  });

  return router;

};