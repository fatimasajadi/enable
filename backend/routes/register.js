const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports = db => {

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.send("Entering Register")
  });

  router.post('/', (req, res) => {
    const { firstName, lastName, address, phoneNumber, email, type, password } = req.body;

    const checkEmail = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }

    const query = {
      text: `INSERT INTO users (firstName, lastName, address, phoneNumber, email, type, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      values: [
        firstName.trim(),
        lastName.trim(),
        address.trim(),
        phoneNumber.trim(),
        email.trim(),
        type.trim(),
        bcrypt.hashSync(password, saltRounds)
      ]
    };

    db.query(checkEmail)
      .then(checkEmailresult => {
        let existUser = checkEmailresult
        console.log(checkEmailresult)
        console.log(existUser)
        if(existUser.length === 0){
          return db.query(query)
            .then(result => {
            const user = result[0];
            req.session['user_id'] = user['id'];
            res.json(user)
          });
        }else{
          res.status(401).send("User already exists")
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      })
  });

  return router;

};