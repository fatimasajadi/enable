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
    console.log([
      firstName.trim(),
      lastName.trim(),
      address.trim(),
      phoneNumber.trim(),
      email.trim(),
      type.trim(),
      bcrypt.hashSync(password, saltRounds)
    ])
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

    db
      .query(query)
      .then(result => res.json(result[0]))
      .catch(err => console.log(err));
  });

  return router;

};